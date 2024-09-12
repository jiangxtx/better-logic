/**
 * 【📌】第K个最大数字
 * [3,1,4,2,7,3,6,7,9,8] -> 第2个最大数字：8
 *                       -> 第3个最大数字：7
 *                       -> 第4个最大数字：7
 */

// 📌 思路一：快速排序 + 取值[K-1]
function sortPick(list, k) {
  list.sort((a, b) => b - a)
  return list[k - 1]
}

// console.log('k-max-list: ', sortPick([3, 1, 4, 2, 7, 3, 6, 7, 9, 8], 2))
// console.log('k-max-list: ', sortPick([3, 1, 4, 2, 7, 3, 6, 7, 9, 8], 3))
// console.log('k-max-list: ', sortPick([3, 1, 4, 2, 7, 3, 6, 7, 9, 8], 4))

/* ********************** 📌 思路二：选择排序 ************************** */

// 选择一个基准cursor，然后作一个粗放排序
const rawSort = (list = []) => {
  // console.log('sorttt: ', list)
  if (list.length < 2) {
    return {
      left: [],
      right: [],
      current: list[0],
    }
  }
  const cursor = Math.floor(list.length / 2)
  const left = []
  const right = []
  let i = 0
  while (i < list.length) {
    if (i === cursor) {
      i++
      continue
    }
    if (list[i] > list[cursor]) {
      left.push(list[i])
    } else {
      right.push(list[i])
    }
    i++
  }
  return {
    left, // 比基准值大的集合
    right, // 比基准值小的集合
    current: list[cursor], // 基准value
  }
}

/**
 * 选择排序.
 * 思路：3 → [1,2,3] 3 [4,7,6,7,9,8]
 *      6 → [4,] 6 [7,7,9,8]
 *      7 → [7] 7 [9,8]
 *    最终，第3最大数字为：7.
 */
function quickPick(list, k) {
  const { left, current, right } = rawSort(list)
  if (left.length === k - 1) {
    return current
  }
  if (left.length > k - 1) {
    return quickPick(left, k)
  }
  if (right.length === 0) {
    // todo...
  }
  return quickPick(right, k)
}

// console.log('quickPick: ', quickPick([3, 1, 4, 2, 7, 3, 6, 7, 9, 8], 2))
// console.log('quickPick: ', quickPick([3, 1, 4, 2, 7, 3, 6, 7, 9, 8], 3))
console.log('quickPick: ', quickPick([3, 1, 4, 2, 7, 3, 6, 7, 9, 8], 4))

/* ********************** 📌 思路三：堆排序Heap ************************** */

function heapPick() {}
