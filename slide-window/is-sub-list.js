/**
 * 【📌】给定两个序列，判定第一个是不是第二个的子序列。
 *  序列就是列表，子序列则指的是，一个列表的元素在第二个列表中都按顺序出现，但是并不必挨在一起。
 *  举个例子，[1, 3, 5] 是 [1, 2, 3, 4, 5] 的子序列，[1, 4, 3] 则不是。
 */

function isSubList(src, sub) {
  if (!Array.isArray(src) || !Array.isArray(sub)) return false

  let srcIndex = 0
  let subIndex = 0
  while (srcIndex <= src.length - 1 && subIndex <= sub.length - 1) {
    if (src[srcIndex] === sub[subIndex]) {
      srcIndex++
      subIndex++
      continue
    }
    srcIndex++
  }

  return subIndex === sub.length
}

/* ~~~~~TEST~~~~ */
/* ~~~~~TEST~~~~ */
/* ~~~~~TEST~~~~ */

console.log('isSubList: ', isSubList([1, 2, 3, 4, 5], [1, 3, 5]))
console.log('isSubList: ', isSubList([1, 2, 3, 4, 5], [1, 4, 3]))
console.log('isSubList: ', isSubList([1, 2, 3], [1, 2, 3]))
console.log('isSubList: ', isSubList([1, 2, 3], [1, 2, 3, 4, 3]))
