/**
 * 【📌】生成器 vs 迭代器
 */

/**
 * 使用生成器来做前num位数的累加
 */
function genSum(num) {
  function* genSum() {
    for (let i = 0; i <= num; i++) {
      yield i
    }
  }

  const gen = genSum()
  let sum = 0
  let tmp
  while ((tmp = gen.next()) && !tmp.done) {
    sum += tmp.value
  }
  return sum
}

/**
 * 使用迭代器来做前num位数的累加
 */
function iteSum(num) {
  const list = Array.from({ length: num + 1 }, (_, i) => i)
  return list.reduce((acc, cur) => {
    acc += cur
    return acc
  }, 0)
}

function test(num) {
  // for generator
  console.time('sum1')
  const m1 = process.memoryUsage().heapUsed
  console.log('>>> sum1 = ' + genSum(num), 'heap usage = ', process.memoryUsage().heapUsed - m1)
  console.timeEnd('sum1')

  // for iterator
  console.time('sum2')
  const m2 = process.memoryUsage().heapUsed
  console.log('>>> sum2 = ' + iteSum(num), 'heap usage = ', process.memoryUsage().heapUsed - m2)
  console.timeEnd('sum2')
}

Promise.resolve()
  // .then(() => test(100))
  // .then(() => test(10000))
  .then(() => test(1000000))
  .then(() => test(100000000))

// test(1000000)

/**
 * TEST 结论：
 * 1、sum数据量小时（比如100/10000这种），无论是时间上还是空间使用上，明显迭代器有优势。
 * 2、当sum数据量大起来后，生成器的优势就越来越明显了。并且是时间 & 空间上的双重碾压。
 * ~by 仲夏 2024-10-06 18:39
 */
