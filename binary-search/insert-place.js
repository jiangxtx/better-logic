/**
 * 【📌】搜索插入位置【leetcode-35题】
 * 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。
 * 请必须使用时间复杂度为 O(log n) 的算法。
 *
 * 举例：nums = [1,3,5,6], target = 5 → 2
 *      nums = [1,3,5,6], target = 2 → 1
 *      nums = [1,3,5,6], target = 7 → 4
 */

function findInsertPlace(list, target) {
  let start = 0
  let end = list.length - 1
  let dest = 0
  let current
  while (true) {
    current = Math.floor((end + start) / 2)
    if (list[current] === target) {
      return current
    }
    if (current <= start) {
      return start + 1
    }
    if (list[current] < target) {
      start = current
      continue
    }
    if (list[current] > target) {
      end = current
      continue
    }
  }
}

// console.log('>>findInsertPlace: ', findInsertPlace([1, 3, 5, 6], 5))
// console.log('>>findInsertPlace: ', findInsertPlace([1, 3, 5, 6], 2))
console.log('>>findInsertPlace: ', findInsertPlace([1, 3, 5, 6], 7))
