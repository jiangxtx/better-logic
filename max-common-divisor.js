/**
 * 最大公约数
 * 思路：（12,40）→ （4,12）→ 4，
 * （36,78）→ （6，36）→ 6
 * （14,100）→ （2,14）→ 2
 * (18, 27) → （9,18）→ 9
 */
function maxCommonDivisor(num1, num2) {
  let [min, max] = [Math.min(num1, num2), Math.max(num1, num2)]
  while (true) {
    const rest = max % min
    if (rest === 0) {
      return min
    }
    // reset the value of min & max
    ;[min, max] = [rest, min]
  }
  // return -1 // ❎ exception! Cannot come here normally!
}

console.log(
  'maxCommonDivisor: ',
  maxCommonDivisor(12, 40),
  maxCommonDivisor(14, 100),
  maxCommonDivisor(18, 27),
  maxCommonDivisor(36, 78)
)
