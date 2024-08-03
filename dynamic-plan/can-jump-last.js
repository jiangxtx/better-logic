/**
 * 【📌】跳跃游戏。【leetcode-55题】
 * 给你一个非负整数数组 nums ，你最初位于数组的 第一个下标 。数组中的每个元素代表你在该位置可以跳跃的最大长度。
 * 判断你是否能够到达最后一个下标，如果可以，返回 true ；否则，返回 false 。
 * 举例：[2,3,1,1,4] → true，[3,2,1,0,4] → false
 */

/**
 * 【💡一】动态规划思想
 * dp[i] 表示第i个元素能跳跃的最大距离
 * @param {*} nums
 * @returns
 */
function canJumpLast(nums) {
  // [0], [1] -> true
  if (nums.length === 1) return true

  const dp = [nums[0]]
  // [0,1] -> false
  if (dp[0] < 1) return false

  for (let i = 1; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 1], i + nums[i])
    // 非最后一个计算时，无法继续向下跳跃了。ext. 谨防对[2,0,0]这个误判
    if (i < nums.length - 1 && dp[i] < i + 1) {
      return false
    }
  }
  // 返回这个逻辑也行，但实际上，能走到对dp[nums.length - 1]赋值，就说明已经能跳跃到最后一步了！
  // return dp[nums.length - 1] >= nums.length - 1
  return true
}

console.log(
  'canJumpLast: ',
  canJumpLast([3, 2, 1, 0, 4]),
  canJumpLast([2, 3, 1, 1, 4]),
  canJumpLast([2, 0, 0]),
  canJumpLast([2, 0, 0, 1])
)

/**
 * 【💡二】直线思维方式，只管往最大的步子去跳，直到不能跳跃为止
 * @param {*} nums
 */
function canJumpLastDriectly(nums) {
  let maxCursor = 0
  for (let i = 0; i < nums.length - 1; i++) {
    maxCursor = Math.max(maxCursor, i + nums[i])
    if (i >= maxCursor) {
      return false
    }
  }
  // 同上，这里到这一步了，也可以直接返回true了
  // return maxCursor >= nums.length - 1
  return true
}

console.log(
  'canJumpLastDriectly: ',
  canJumpLastDriectly([3, 2, 1, 0, 4]),
  canJumpLastDriectly([2, 3, 1, 1, 4]),
  canJumpLastDriectly([2, 0, 0]),
  canJumpLastDriectly([2, 0, 0, 1])
)
