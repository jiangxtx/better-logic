/**
 * 1,1,2,3,5,8,13,21,...
 *
 * f(n) = f(n-1) + f(n-2)
 * f(1) = 1
 * f(2) = 1
 */

/**
 * 【📌】动态规划来实现兔子数列
 */
function fibonacci(n) {
  if (n <= 2) return 1

  // 动态规划常用法，使用数组缓存中间数据
  const dp = [0, 1, 1]
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }
  return dp[n]
}

console.time('fibonacci')
console.log('fibonacci: ', fibonacci(2), fibonacci(3), fibonacci(88))
console.timeEnd('fibonacci')

/**
 * 【📌】上面的方法，浪费空间，需要额外申请长度为n的dp
 */
function fibonacci2(n) {
  if (n <= 2) return 1

  let tmp_2 = 1
  let tmp_1 = 1
  let sum = 0
  for (let i = 3; i <= n; i++) {
    sum = tmp_1 + tmp_2
    tmp_2 = tmp_1
    tmp_1 = sum
  }
  return sum
}

/**
 * 【📌】执行后发现 fibonacci2 性能优势明显 👍🏻！
 * WHY?
 *  1. 少了 dp 中间变量，寻址成本降低
 *  2. JS中的数组并非严格意义上的连续存储单元，所以访问自然没有直接赋值快
 */
console.time('fibonacci2')
console.log('fibonacci2: ', fibonacci2(2), fibonacci2(3), fibonacci2(88))
console.timeEnd('fibonacci2')
