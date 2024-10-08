/**
 * 【📌】最大右侧子序列。
 *
 * maxRightSubList([1,2,4], [1,4,3,5,2]) → [4,-1,5]
 * maxRightSubList([1,5,2], [1,4,3,5,2]) → [4,-1,-1]
 */

/**
 * 暴力解法，两层for循环 总能搞得定
 */
function maxRightSubList_force(subList, list) {
  const result = []
  for (let i = 0; i < subList.length; i++) {
    const tmp = subList[i]
    const index = list.findIndex((item) => item === tmp)
    if (index === -1 || index === list.length - 1) {
      result.push(-1)
      continue
    }

    for (let j = index + 1; j < list.length; j++) {
      if (list[j] > tmp) {
        result.push(list[j])
        break
      }
    }
    // 内层for没命中时，兜底处理
    if (result[i] == null) {
      result.push(-1)
    }
  }
  return result
}

console.log('maxRightSubList_force>> ', maxRightSubList_force([1, 0, 2, 4], [1, 4, 0, 3, 5, 2]))
console.log('maxRightSubList_force>> ', maxRightSubList_force([1, 5, 2], [1, 4, 0, 3, 5, 2]))

/**
 * 🔥单调栈的思想。
 *  思路：哎嘛，简约而不简单呐。
 *  1. 维护一个Map键值对，key为list里的每一个元素，value为key对应的最大右侧值。
 *  2. 这样对于subList，就直接遍历一遍就OK了。
 */
function maxRightSubList(subList, list) {
  const map = new Map()
  const stack = []
  let item

  // 依次取出list中的元素，直到没有了（要通过 != null 来判断）
  while ((item = list.shift()) != null) {
    // 当单调栈中栈顶元素小于当前item时，就弹出并放入map中
    while (stack.length && stack[stack.length - 1] < item) {
      let pop = stack.pop()
      map[pop] = item
    }
    stack.push(item)
  }
  // 剩余元素兜底
  stack.forEach((item) => (map[item] = -1))
  return subList.map((item) => map[item] || -1)
}

console.log('maxRightSubList>> ', maxRightSubList([1, 0, 2, 4], [1, 4, 0, 3, 5, 2]))
console.log('maxRightSubList>> ', maxRightSubList([1, 5, 2], [1, 4, 0, 3, 5, 2]))
