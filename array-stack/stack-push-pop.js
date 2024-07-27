/**
 * 【📌】栈的压入弹出
 * 输入两个整数序列，第一个序列表示栈的压入顺序，请判断第二个序列是否为该栈的弹出顺序。
 * 假设压入栈的所有数字均不相等。例如: 序列 1,2,3,4,5 是某栈的压入顺序，序列 4,5,3,2,1 是该压栈序列对应的一个弹出序列，但 4,3,5,1,2 就不可能是该压栈序列的弹出序列。
 *
 * 【🔥】写算法，千万不要妄自菲薄！为何这么说呢？
 * 半年前，这个算法题，我早已经得心应手了。谁曾想，半年后，也就是现在（2024年07月27日）再写时，还是一脸懵逼中。
 * 嗨，普通人就这样。总得下苦功夫，并且还得苟日新，日日新，又日新。
 * 唉，代码看着挺简单，但是独立完整写出来，不容易啊！
 * ~仲夏 2024-07-27 21:52:47
 */
function isRevalentStack(src, dest) {
  if (src.length !== dest.length) {
    return false
  }
  // 定义两个中间变量，TIPS：尽量不要去更改 src & dest
  const stack = []
  let destCursor = 0
  for (let i = 0; i < src.length; i++) {
    stack.push(src[i])
    while (destCursor < dest.length && stack[stack.length - 1] === dest[destCursor]) {
      destCursor++
      stack.pop()
    }
  }
  return stack.length === 0 && destCursor === dest.length
}

console.log('isRevalentStack: ', isRevalentStack([1, 2, 3, 4, 5], [4, 5, 3, 2, 1]))
console.log('isRevalentStack: ', isRevalentStack([1, 2, 3, 4, 5], [4, 3, 5, 1, 2]))
