const p1 = new Promise((resolve, reject) => {
  /**
   * 💡TIPS: 最先响应的resolve/reject会作为Promise的下一步状态进行流转（不可逆），并且参数被当做返回值。
   *         但是整个Promise里的构造函数都会被执行完，除非遇到return.
   */
  // resolve('Jack')
  reject('Jack Error')
  setTimeout(() => {
    console.log('delay ... waiting')
    resolve('Jack delaying')
  }, 1500)
})

p1.then((data) => console.log('p1: ', data)).catch((err) => console.log('p1 err: ', err))
