/**
 * 并发请求 + 最大限制
 * 源码 p-limit 库：https://juejin.cn/post/7257410574853603385
 */
// import Queue from './queue'

function parallelLimit(limit = 10) {
  const queue = [] // new Queue()
  let activeCount = 0

  function next() {
    activeCount--
    if (activeCount < limit && queue.length) {
      queue.shift()()
    }
  }

  async function run(fn, resolve, ...args) {
    activeCount++
    // 返回一个fn执行的Promise对象
    const result = (async () => fn(...args))()
    resolve(result)
    try {
      await result
    } catch (err) {
      // ignore
    } finally {
      next()
    }
  }

  function enqueue(fn, resolve, args) {
    queue.push(run.bind(undefined, fn, resolve, ...args))

    // if (activeCount < limit && queue.length > 0) {
    //   queue.shift()()
    // }
    ;(async () => {
      // 确保activeCount取值更加精确
      await Promise.resolve()

      if (activeCount < limit && queue.length > 0) {
        queue.shift()()
      }
    })()
  }

  const generator = (fn, ...args) => {
    return new Promise((resolve) => {
      enqueue(fn, resolve, args)
    })
  }

  Object.defineProperties(generator, {
    avtiveCount: {
      get: () => activeCount,
    },
    penddingCount: {
      get: () => queue.length,
    },
    clear: {
      value: () => {
        queue.length = 0
      },
    },
  })

  return generator
}

/* ~~~~~~~~~ FOR TEST ~~~~~~ */
/* ~~~~~~~~~ FOR TEST ~~~~~~ */
/* ~~~~~~~~~ FOR TEST ~~~~~~ */

const limit = parallelLimit(2) // 限制同时执行的操作数量为3

const asyncTask = (id) => {
  return limit(() => {
    return new Promise((resolve) => {
      console.log(`Start task ${id}`, Date.now())
      setTimeout(() => {
        console.log(`End task ${id}`, Date.now())
        resolve(id)
      }, 1000)
    })
  })
}

const la = limit(() => {
  return new Promise((resolve) => {
    console.log(`Start task AA`, Date.now())
    setTimeout(() => {
      console.log(`End task AA`, Date.now())
      resolve('AA')
    }, 1000)
  })
})

la.then((data) => console.log('la>>>', data))

// asyncTask(1)
// asyncTask(2)
// asyncTask(3)

const pa = Promise.all([asyncTask(1), asyncTask(2), asyncTask(3)])
pa.then((data) => console.log('pa >>>', data))
