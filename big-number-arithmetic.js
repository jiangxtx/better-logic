/**
 * 【📌】大数运算，比如相加、相乘
 */

/**
 * 【🔥】生成62进制的映射 {'0':0, '1':1,..., 'a': 10, 'b':11,..., 'z': 35, 'A': 36, 'B': 37,... 'Z': 61}
 * @returns
 */
const digMap = (function genDigMap() {
  const make = (length, startChar) =>
    Array.from({ length }, (_, index) => String.fromCharCode(startChar.charCodeAt() + index))
  const digList = [...make(10, '0'), ...make(26, 'a'), ...make(26, 'A')]
  return digList.reduce((prev, cur, index) => ((prev[cur] = index), prev), {})
})()

const res2DigMap = Object.keys(digMap).reduce((pre, cur) => {
  pre[[digMap[cur]]] = cur
  return pre
}, {})

/**
  【📌】实现两个 62 进制数的大数加法
  输入：两个 62 进制数，String 类型
  输出：两数之和，String 类型
  62 进制数：按照 0-9，a-z，A-Z 递增

  举例：sum('12e','a45') → 'b6j'.
 */
function bigSum(str1, str2) {
  const DIG = 62
  const len1 = str1.length
  const len2 = str2.length
  const len = Math.max(len1, len2)
  // 对齐两个字符串长度
  str1 = str1.padStart(len, '0')
  str2 = str2.padStart(len, '0')

  let overflow = 0 // 进位
  const result = []
  for (let i = len - 1; i >= 0; i--) {
    const total = digMap[str1[i]] + digMap[str2[i]] + overflow
    result.unshift(res2DigMap[total % DIG])
    overflow = ~~(total / DIG)
    // console.log(str1[i], digMap[str1[i]], total % DIG, total / DIG)
  }
  if (overflow > 0) {
    result.unshift(res2DigMap[overflow])
  }
  return result.join('')
}

console.log('bigSum: ', bigSum('12e', 'a45'), bigSum('12X', 'a45'), bigSum('1', '0'))

/**
 * 【📌】大数相乘
 * TIPS: 总体路子和 bigSum 一致，只是加法口诀 → 乘法口诀了。乘法的底层就是加法逻辑！
 */
function bigMultuple(str1, str2) {
  const DIG = 62
  // 把str转换为10进制
  const strToDigtal = (str) => {
    let result = 0
    for (let i = str.length - 1; i >= 0; i--) {
      result += Math.pow(DIG, str.length - 1 - i) * digMap[str[i]]
    }
    return result
  }

  let result = '0'
  const digStr2 = strToDigtal(str2)
  // 把 str1 连续加个 digStr2 遍
  for (let i = 1; i <= digStr2; i++) {
    result = bigSum(result, str1)
  }
  return result
}

console.log('bigSquare: ', bigMultuple('2', 'a45'), bigMultuple('a1b2c3', 'a45'))
