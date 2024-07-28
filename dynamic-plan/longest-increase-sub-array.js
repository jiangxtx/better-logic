/**
 * 【📌】动态规划之——最长递增子序列
 * 给你一个整数数组 nums ，找到其中最长严格递增子序列的长度，并作为结果返回。
 * 最长递增子序列（Longest Increasing Subsequence）是指在给定的一组数字中，按照从左向右顺序，由递增的数字组成的子序列（中间可以有间隔）中，取长度最大的子序列即为最长递增子序列。
 * 如给定“1 2 4 3”，则递增的子序列有“1 2”、“1 4”、“1 3”、“2 4”、“2 3”、“1 2 4”、“1 2 3”，则最长的为“1 2 4”和“1 2 3”，长度为3。
 */

// ❌ 此逻辑实现有问题，log中的最后一条测例没通过！
function longestIncresaseSubArray_1(list) {
  const dp = Array.from({ length: list.length }).fill(0)
  dp[0] = 1
  for (let i = 1; i < list.length; i++) {
    // 逻辑有缺陷 BUG 💩...
    dp[i] = Math.max(...dp.map((item, index) => (list[i] > list[index] ? item + 1 : item)))
  }
  console.log('dp: ', dp)
  return Math.max(...dp)
}

console.log(
  'longestIncresaseSubArray_1: ',
  longestIncresaseSubArray([10, 9, 2, 5, 3, 7, 101, 18]),
  longestIncresaseSubArray([0, 1, 0, 3, 2, 3]),
  longestIncresaseSubArray([3, 1, 6, 2, 2, 7]),
  longestIncresaseSubArray([7, 7, 7, 7, 7, 7, 7]),
  longestIncresaseSubArray_1([4, 10, 4, 3, 8, 9]) // 上面的代码，跑这个测例 出错了❌
)

// ✅ 嗨，终于通过了！👍🏻！~2024-07-28 13:15
function longestIncresaseSubArray(list) {
  const dp = Array.from({ length: list.length }).fill(1)
  for (let i = 1; i < list.length; i++) {
    const caches = []
    for (let j = 0; j < i; j++) {
      if (list[i] > list[j]) {
        caches.push(dp[j] + 1)
      }
    }
    dp[i] = Math.max(...caches, dp[i])
  }
  return Math.max(...dp)
}

console.log(
  'longestIncresaseSubArray: ',
  longestIncresaseSubArray([10, 9, 2, 5, 3, 7, 101, 18]),
  longestIncresaseSubArray([0, 1, 0, 3, 2, 3]),
  longestIncresaseSubArray([3, 1, 6, 2, 2, 7]),
  longestIncresaseSubArray([7, 7, 7, 7, 7, 7, 7]),
  longestIncresaseSubArray([4, 10, 4, 3, 8, 9])
)
