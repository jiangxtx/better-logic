/**
 * 💡12345678 → '12,345,678'
 */

function beautify(str) {
  str = String(str)
  let cursor = str.length - 1
  let count = 0
  const result = []

  while (cursor >= 0) {
    count++
    result.unshift(str[cursor])
    if (count === 3) {
      // 首位无需","
      cursor !== 0 && result.unshift(',')
      count = 0
    }
    cursor--
  }

  return result.join('')
}

console.log('beautify: ', beautify(12345678))
console.log('beautify: ', beautify(123456789))
