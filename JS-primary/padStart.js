/**
 * 【📌】padStart() 的实现
 * @param {*} maxLength
 * @param {*} char
 * @returns
 */
String.prototype.ipadStart = function (maxLength, char) {
  maxLength = Math.max(~~maxLength, this.length)
  const gapLen = maxLength - this.length
  if (gapLen <= 0) {
    // 📢：need String() to wrap, otherwise it would return an Object[String]
    return String(this)
  }
  return Array.from({ length: gapLen }, (_) => char).join('') + this
}

console.log(
  'ipadStart: ',
  'opps'.ipadStart(10, 'A'),
  'opps'.ipadStart(2, 'A'),
  'opps'.ipadStart(5, 'A')
)
