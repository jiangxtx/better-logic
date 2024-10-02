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

const repeatFunc = repeat(console.log, 4, 3000)
repeatFunc('hello jiangxtx', Date.now())
console.log('repeatFunc>>', repeatFunc, typeof repeatFunc)
