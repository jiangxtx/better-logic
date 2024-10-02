/**
 * 【📌】需要实现的函数​
  function repeat (func, times, wait) {​
  // 补全​
  }​
  ​
  // 使下面调用代码能正常工作​
  const repeatFunc = repeat(console.log, 4, 3000);​
  repeatFunc("hello world");  //会输出4次 hello world, 每次间隔3秒
 */

/**
 * 【方法一📌】利用 async/await 特性，同步写法
 */
function repeat(func, times = 1, wait = 0) {
  const sleep = (delay = 0) => new Promise((resolve) => setTimeout(resolve, delay))

  const callback = async (...args) => {
    await func(...args)
    while (times > 1) {
      times--
      await sleep(wait)
      await func(...args)
    }
  }

  return callback
}

// const repeatFunc = repeat(console.log, 4, 3000)
// repeatFunc('hello jiangxtx', Date.now())
// console.log('repeatFunc>>', repeatFunc, typeof repeatFunc)

/**
 * 【方法二📌】纯粹利用 setTimeout 异步实现
 */
function repeat_2(func, times = 1, wait = 0) {
  let count = 0
  return function (...args) {
    const delayRun = (delay = wait) => {
      if (count >= times) return

      setTimeout(() => {
        count++
        func(...args)
        delayRun()
      }, delay)
    }

    // 第一次执行 无需延迟
    delayRun(0)
  }
}

const repeatFunc = repeat_2(console.log, 4, 3000)
repeatFunc('hello jiangxtx', Date.now())
