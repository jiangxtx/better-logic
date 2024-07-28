/**
 * 【📌】手撕 Vue 里面的 $nextTick
 * 比较简单的吧
 */
function nextTick(fc) {
  if (typeof fc !== 'function') {
    throw new Error('should be a function')
  }
  if (window.Promise) {
    Promise.resolve().then(() => {
      fc()
    })
    return
  }
  setTimeout(() => fc(), 0)
}
