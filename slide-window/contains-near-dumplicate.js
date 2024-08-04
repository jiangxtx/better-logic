/**
 * 【📌】存在重复元素②【leetcode-219题】
 * 给你一个整数数组 nums 和一个整数 k ，判断数组中是否存在两个 不同的索引 i 和 j ，满足 nums[i] == nums[j] 且 abs(i - j) <= k 。
 * 如果存在，返回 true ；否则，返回 false 。
 *
 * 举例：nums = [1,0,1,1], k = 1     → true
 *      nums = [1,2,3,1,2,3], k = 2 → false
 *
 * 常规思路：nums → map映射，key：nums[i],value：是一个Array，里面的值为对应key的index下标，
 *        满足true的条件为：value数组长度>1,且存在相邻元素之差的绝对值 <= k。
 *    具体答案见leetcode。本次主要解决的是用“滑动窗口”思想来处理。
 */

/**
 * 💡有一块长为k+1的板子，在nums里面滑动，只要板子内覆盖有相同的元素，即满足条件。【滑动窗口】
 * @param {*} nums
 * @param {*} k
 */
function containsDumplicate(nums, k) {
  const set = new Set()
  for (let i = 0; i < nums.length; i++) {
    if (i > k) {
      set.delete(nums[i - k - 1])
    }
    if (set.has(nums[i])) return true
    set.add(nums[i])
  }
  return false
}

console.log(
  'containsDumplicate: ',
  containsDumplicate([1, 0, 1, 1], 1),
  containsDumplicate([1, 2, 3, 1], 3),
  containsDumplicate([1, 2, 3, 1, 2, 3], 2)
)
