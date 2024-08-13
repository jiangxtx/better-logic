/**
 * 【📌】旨在展示如何代理window对象，来实现JS沙箱机制。
 * qiankun框架内部运用的就是这套思想。
 */

// 用来暂存对原始window对象的更改操作
const rawWindowUpdates = {}

// 定义一个window的代理对象
const proxy = new Proxy(window, {
  get: function (target, key) {
    console.log('>> proxy get: ', key, target[key])
    return rawWindowUpdates[key] || target[key]
  },
  set: function (target, key, value) {
    console.log('>> proxy set: ', key, value, target[key])
    rawWindowUpdates[key] = value + '__set_val_tail__'
    return true
  },
})

window.proxy = proxy

/* qiankun内部，解析完页面的script脚本，然后通过 eval 这种方式执行 */
eval(`
(function (window) {
  window.name = 'jack'
  console.log('name: ', window.name)
  console.log('fetch: ', window.fetch)
})(window.proxy)
`)

console.log('....window...', window.name)
