/**
 * 【📌】括号的有效最大组合
 * 1: ['()']
 * 2: ['()()', '(())']
 * return {Array}
 */

// 思路：找 f(n) 和 f(n-1) 之间的关系，然后递归寻求解决方案！
function maxBracketList(n) {
  if (n === 1) {
    return ['()']
  }

  const prevList = maxBracketList(n - 1)
  const result = prevList.reduce((acc, cur) => {
    for (let i = 0; i < cur.length; i++) {
      acc.push(cur.slice(0, i) + '()' + cur.slice(i))
    }
    return acc
  }, [])
  return [...new Set(result)]
}

console.log('maxBracketList: ', maxBracketList(1), maxBracketList(2), maxBracketList(3))

/**
 * 递归 ＋ 回溯
 */
function maxBracketList_v2(n) {
  const result = []

  function generate(str, open, close) {
    if (str.length === n * 2) {
      result.push(str)
      return
    }
    if (open < n) {
      generate(str + '(', open + 1, close)
      // return ！这里不能有return，否则就不完备了！
    }
    if (close < open) {
      generate(str + ')', open, close + 1)
    }
  }

  generate('', 0, 0)
  return result
}

console.log('maxBracketList_v2: ', maxBracketList_v2(1), maxBracketList_v2(2), maxBracketList_v2(3))
