/**
 * 【📌】两个没有重复元素的数组 nums1 和 nums2，其中 nums1 是 nums2 的子集，找出 nums1 中每个元素在 nums2 中的下一个比其大的值。
 * nums1 中数字 x 的下一个更大元素是指 x 在 nums2 中对应位置的右边的第一个比 x 大的元素。如果不存在，对应位置输出 -1 。
 *
 * 输入: nums1 = [4,1,2] nums2 = [1,3,4,2]
 * 输出: [-1,3,-1]
 * 解释:
 *     对于 num1 中的数字 4 ，你无法在第二个数组中找到下一个更大的数字，因此输出 -1 。
 *     对于 num1 中的数字 1 ，第二个数组中数字1右边的下一个较大数字是 3 。
 *     对于 num1 中的数字 2 ，第二个数组中没有下一个更大的数字，因此输出 -1 。
 */

// 法一：暴力解法，双重循环
function nextLargeList(nums1, nums2) {
  const nums2Map = nums2.reduce((acc, num, index) => {
    acc[num] = index
    return acc
  }, {})
  return nums1.map((num) => {
    for (let i = nums2Map[num] + 1; i < nums2.length; i++) {
      if (nums2[i] > num) {
        return nums2[i]
      }
    }
    return -1
  })
}

console.log('nextLargeList:: ', nextLargeList([4, 1, 2], [1, 3, 4, 2]))

// 法二：单调栈
function nextLargeListByStack(nums1, nums2) {
  const nextLargeMap = {}
  const stack = []
  while (nums2.length > 0) {
    const head = nums2.shift()
    if (!stack.length) {
      stack.push(head)
      continue
    }
    while (stack.length && stack[stack.length - 1] < head) {
      const top = stack.pop()
      nextLargeMap[top] = head
    }
    stack.push(head)
  }
  return nums1.map((num) => nextLargeMap[num] || -1)
}

console.log('nextLargeListByStack:: ', nextLargeListByStack([4, 1, 2], [1, 3, 4, 2]))
