/**
 * 【题目📌】JS实现一个带并发限制的异步调度器。
 * 保证同时运行的任务最多有两个。
  class Scheduler {
  add(promiseCreator) { ... }
    // ...
  }
  const timeout = (time) => new Promise(resolve => {
    setTimeout(resolve, time)
  })
  const scheduler = new Scheduler()
  const addTask = (time, order) => {
    scheduler.add(() => timeout(time))
      .then(() => console.log(order))
  }
  addTask(1000, '1')
  addTask(500, '2')
  addTask(300, '3')
  addTask(400, '4')
  // output: 2 3 1 4
 */

class Scheduler {
  constructor(max = 2) {
    this.max = 2 // 最大并发数
    this.currentCount = 0 // 当前进行中的并发数
    this.queue = []
    this.map = new WeakMap()
  }

  /**
   * 往队列里加入待执行的Promise化方法
   * @param {*} promiseCreator
   * @returns
   */
  add(promiseCreator) {
    if (typeof promiseCreator !== 'function') {
      throw new TypeError('promiseCreator must be a function')
    }
    this.queue.push(promiseCreator)
    this.map.set(promiseCreator, this._genPendingPromise())
    this._run()

    // 返回一个Promise，用于业务的then链式调用
    return this.map.get(promiseCreator)
  }

  /**
   * 生成一个pending状态的Promise实例，并且额外携带状态流转方法
   * @returns {PromiseInstance}
   */
  _genPendingPromise() {
    let resolved
    let rejected
    const p = new Promise((resolve, reject) => {
      resolved = resolve
      rejected = reject
    })
    p.resolve = resolved
    p.reject = rejected
    return p
  }

  _run() {
    if (this.currentCount >= this.max) return

    const callcack = this.queue.shift()
    if (!callcack) return

    this.currentCount++
    const p = this.map.get(callcack)
    callcack()
      .then((data) => {
        this.currentCount--
        p.resolve(data)
        this._run()
      })
      .catch((err) => {
        this.currentCount--
        p.reject(err)
        this._run()
      })
  }
}

/* ~~~~~TEST~~~~ */
/* ~~~~~TEST~~~~ */
/* ~~~~~TEST~~~~ */

const timeout = (time, order) =>
  new Promise((resolve) => {
    console.log('start>>', order, Date.now())
    setTimeout(resolve, time)
  }) //.then(() => console.log('end>>', order, Date.now()))
const scheduler = new Scheduler()
const addTask = (time, order) => {
  scheduler.add(() => timeout(time, order)).then(() => console.log('end>>', order, Date.now()))
}
addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')
