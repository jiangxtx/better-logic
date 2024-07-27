/**
 * 如何在 JS 代码中消灭 for 循环
 * https://zhuanlan.zhihu.com/p/51549583
 */

/**
 * 【📌一】打平数组
 * 一、递归实现版
 * const nestedArr = [1, 2, [3, 4, [5, 6]]];
 */
function flatten(arr = []) {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flatten(cur) : cur)
  }, [])
}

console.log('flatten: ', flatten([1, 2, [3, 4, [5, 6]]]))

// 二、循环实现版
function cycleFlatten(arr = []) {
  const result = [] // store final result
  let queue = [...arr] //

  while (queue.length > 0) {
    const item = queue.shift()
    if (Array.isArray(item)) {
      queue.push(...item)
    } else {
      result.push(item)
    }
  }
  return result
}

console.log('cycleFlatten: ', flatten([1, 2, [3, 4, [5, 6]]]))

/**
 * 【📌二】问题十四： 将两个数组每个元素一一对应相加。注意，第二个数组比第一个多出两个，不要把第二个数组遍历完。
 * const num1 = [3, 4, 5, 6, 7];
 * const num2 = [43, 23, 5, 67, 87, 3, 6];
 */
const add = (x) => (y) => x + y

const zip = (fc) => (listA) => (listB) => {
  if (!listA.length || !listB.length) {
    return [...listA, ...listB]
  }
  const [headA, ...restA] = listA
  const [headB, ...restB] = listB
  return [fc(headA)(headB), ...zip(fc)(restA)(restB)]
}

console.log('zip: ', zip(add)([3, 4, 5, 6, 7])([43, 23, 5, 67, 87, 3, 6]))

/**
 * 【📌三】问题十六：找出数组中的奇数，然后取出前4个
 * const numList = [1, 3, 11, 4, 2, 5, 6, 7];
 * TIPS：用lamda思想去实现，而不是简单的 filter + slice
 */
const isOdd = (num) => num % 2 !== 0

const pickLimit = (fc) => (limit) => (list) => {
  if (limit <= 0 || !list.length) return []
  const [head, ...rest] = list
  return isOdd(head) ? [head, ...pickLimit(fc)(limit - 1)(rest)] : pickLimit(fc)(limit)(rest)
}

console.log('pickLimit: ', pickLimit(isOdd)(4)([1, 3, 11, 4, 2, 5, 6, 7]))
