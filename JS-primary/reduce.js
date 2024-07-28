/**
 * 【📌】手动实现 Array reduce
 * TIPS：这类数组原生实现的，没有 for 搞不定的，~欧耶~
 */

// function reduce(fc, data) {
//   if (typeof fc !== 'function') {
//     throw new Error('reduce function')
//   }
// }

Array.prototype.ireduce =
  Array.prototype.ireduce ||
  function (fc, initVal) {
    if (typeof fc !== 'function') {
      throw new Error('reduce function')
    }

    // 🔥看了AI助手后，得知 需要判断是否存在initValue
    const hasInitVal = arguments.length > 1
    let acc = hasInitVal ? initVal : this[0]
    for (let i = hasInitVal ? 0 : 1; i < this.length; i++) {
      acc = fc(acc, this[i], i, this)
    }

    return acc
  }

console.log(
  'reduce:: ',
  [1, 2, 3, 4].ireduce((pre, cur) => {
    pre += cur
    return pre
  }, 10),
  [1, 2, 3, 4].ireduce((pre, cur) => {
    pre += cur
    return pre
  })
)
