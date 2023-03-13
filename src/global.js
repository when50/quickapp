/**
 * @file 全局能力的配置与获取
 * 文档地址：https://doc.quickapp.cn/tutorial/framework/optimization-skills.html#%E4%BD%BF%E7%94%A8-globaljs
 */

function getGlobalRef() {
  return Object.getPrototypeOf(global) || global
}

const quickappGlobal = getGlobalRef()

/**
 * 设置全局(被APP与Page共享)数据；
 * @param key {string}
 * @param val {*}
 */
function setGlobalData(key, val) {
  quickappGlobal[key] = val
}

/**
 * 获取全局(被APP与Page共享)数据；
 * @param key {string}
 * @return {*}
 */
function getGlobalData(key) {
  return quickappGlobal[key]
}

import nativeFetch from '@system.fetch'
const natives = {
  async fetch(options) {
    const p1 = new Promise((resolve, reject) => {
      options.success = function(data, code) {
        resolve({data, code})
      }
      options.fail = function(data, code) {
        resolve({data, code})
      }
      nativeFetch.fetch(options)
    })
    return p1
  }
}

// 两个方法默认定义在全局
setGlobalData('setGlobalData', setGlobalData)
setGlobalData('getGlobalData', getGlobalData)
setGlobalData('natives', natives)

export { setGlobalData, getGlobalData }
