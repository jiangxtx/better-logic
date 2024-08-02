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
