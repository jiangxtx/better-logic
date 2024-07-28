/**
 * 【📌】最大子数组和
 * 【🔥】动态规划法
 * 给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
 * 子数组是数组中的一个连续部分。
 * 举例：
 *    nums = [-2,1,-3,4,-1,2,1,-5,4]
 *    输出：6。
 *    解释：连续子数组 [4,-1,2,1] 的和最大，为 6
 */
function maxSubArray(list) {
  const dp = []
  dp[0] = list[0]
  for (let i = 1; i < list.length; i++) {
    const item = list[i]
    dp[i] = Math.max(dp[i - 1] + item, item)
  }
  console.log(dp)
  return Math.max(...dp)
}

console.log('maxSubArray: ', maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))
