/**
 * @Description: 封装的本地存储工具
 * @author yeship
 * @date 2021/7/25 23:47
 */

import _ from 'lodash';
import Taro from '@tarojs/taro';
import { SHA1 } from 'crypto-es/lib/sha1.js';
import {parseToJSON} from "./index";

const setItem = (key, value) => Taro.setStorageSync(key, value);
const getItem = (key) => Taro.getStorageSync(key);
const removeItem = (key) => Taro.removeStorageSync(key);

const getItemKeys = () => Taro.getStorageInfoSync().keys;

const CACHE_PREFIX = '';
const CACHE_EXPIRATION_PREFIX = 'exp-';
const EXPIRY_UNITS = 1000; // seconds

const getKeys = _.memoize((key = '') => {
  const short = SHA1(key).toString();
  console.log('SHA1(key).toString()', short);
  const theKey = CACHE_PREFIX + short;
  const exprKey = CACHE_EXPIRATION_PREFIX + short;
  return { theKey, exprKey };
});

const currentTime = () => Math.floor(new Date().getTime() / EXPIRY_UNITS);

const storageTools = {
  PageCachePrefix: 'page-cache-',

  get(key, defaultValue) {
    const { exprKey, theKey } = getKeys(key);
    const expiry = getItem(exprKey);
    if (expiry && currentTime() >= parseInt(expiry, 10)) {
      removeItem(exprKey);
      removeItem(theKey);
      return defaultValue;
    }
    const value = getItem(theKey);
    return value ? parseToJSON(value) : defaultValue;
  },

  /**
   * Taro存储localStorage存的是对象 => {data:''}
   * 所有H5中使用localStorage和Taro交互时候注意存取
   * @param key
   * @param value
   * @param time unit: customize
   */
  set(key, value = '', time) {
  const { exprKey, theKey } = getKeys(key);
  if (time) {
    const strTime = (currentTime() + time).toString();
    setItem(exprKey, strTime);
    setItem(theKey, JSON.stringify(value));
    return;
  }
  removeItem(exprKey);
  setItem(theKey, JSON.stringify(value));
},

remove(key) {
  const { exprKey, theKey } = getKeys(key);
  removeItem(exprKey);
  removeItem(theKey);
},

isExpired(key) {
  const { exprKey } = getKeys(key);
  const expiry = getItem(exprKey);
  if (_.isNumber(expiry) && expiry > 0) {
    // log('是否过期？', 1, expired, currentTime());
    return expiry && currentTime() >= parseInt(expiry, 10);
  }
  return true;
},

flush() {
  const keys = getItemKeys();
  keys.map((key) => {
    const remove = key.indexOf(CACHE_PREFIX) === 0 || key.indexOf(CACHE_EXPIRATION_PREFIX) === 0;
    if (remove) {
      removeItem(key);
    }
  });
},

flushExpired() {
  const keys = getItemKeys();
  keys.map((key) => {
    if (key.indexOf(CACHE_EXPIRATION_PREFIX) === 0) {
      const exprKey = key;
      const expiry = getItem(exprKey);
      if (expiry && currentTime() >= parseInt(expiry, 10)) {
        const theKey = CACHE_PREFIX + key.replace(CACHE_EXPIRATION_PREFIX, '');
        removeItem(exprKey);
        removeItem(theKey);
      }
    }
  });
},
};

// 刷新一下
storageTools.flushExpired();

export default storageTools;
