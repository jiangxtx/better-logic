/**
 * 【方法一📌】尝试代理fetch请求，使得能够额外获取到请求的响应res，并且单独打印出来。
 * TIPS：这也是posthog上报的核心思想。
 */

// Note：这个千万不能写在 window.fetch 自定义的方法体里，否则会造成 StackOverflow.
const originFetch = window.fetch

/**
 * 重写 fetch 方法
 * @param {*} input
 * @param {*} init
 * @param {*} callback 业务回调
 * @returns
 */
window.fetch = async function (input, init, callback) {
  callback = callback || (() => {})
  try {
    const res = await originFetch(input, init)

    const dealExtra = (clonedRes) => {
      clonedRes
        .text()
        .then((text) => {
          console.log('>>> fetch text: ', text)
          callback(text)
        })
        .catch((error) => callback(error))
    }
    // 需要clone一份，否则会篡改原res信息
    dealExtra(res.clone())

    return res
  } catch (err) {
    callback(error)
    throw new Error(err)
  }
}

/**
 * 【方法二📌】通过 Proxy 来实现对 fetch 的拦截处理
 */
const proxyFetch = new Proxy(window.fetch, {
  /**
   * @param {*} target 原始方法
   * @param {*} thisArg this上下文
   * @param {*} argumentsList arguments参数
   * @returns
   */
  async apply(target, thisArg, argumentsList) {
    const callback = argumentsList.length > 2 ? argumentsList[2] : () => {}
    try {
      const res = await target.apply(thisArg, argumentsList)

      const dealExtra = (clonedRes) => {
        clonedRes
          .text()
          .then((text) => {
            console.log('>>> fetch text: ', text)
            callback(text)
          })
          .catch((error) => callback(error))
      }
      // 需要clone一份，否则会篡改原res信息
      dealExtra(res.clone())

      // 返回原始响应对象
      return res
    } catch (error) {
      // 处理错误
      callback(error)
      throw error // 重新抛出错误，以便调用方可以处理
    }
  },
})
window.fetch = proxyFetch

/**
 * 【📌】通过 Proxy 来实现可手动取消的 fetch 请求
 */
const cancelableFetch = new Proxy(window.fetch, {
  apply(target, thisArg, args) {
    const ac = new AbortController()
    const signal = ac.signal
    args[1] = {
      ...(args[1] || {}),
      signal,
    }
    const p = target.apply(thisArg, args)
    console.log('fetch apply...', args, target)
    // 此处必须要bind，否则执行会报this指向异常
    p.abort = ac.abort.bind(ac)
    return p
  },
})
window.cancelableFetch = cancelableFetch

const p = cancelableFetch(
  'http://localhost:8080/api/engine/decision_flow/version/detail?decisionFlowCode=test_decison_flow_1&version=v0.9'
)
setTimeout(() => {
  console.log('timeout fetch..', typeof p.abort, p)
  p.abort()
}, 20)
