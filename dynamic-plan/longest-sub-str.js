/**
 * 【📌】给定一个字符串，找出不含有重复字符的最长子串的长度。
    示例：
      输入: "abcabcbb"
      输出: 3
      解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
 */

/**
 * dp[i]: 表示以第i个字符结尾的最长子串长度
 * @param {*} str
 */
function longestSubStr(str) {
  const dp = [1]
}

function longestSubStrBySlideWindow(str) {
  let start = 0
  let longest = 0
  const map = new Map()
  for (let end = 0; end < str.length; end++) {
    const char = str[end]
    if (map.has(char) && map.get(char) >= start) {
      start = map.get(char) + 1
    }
    map.set(char, end)
    longest = Math.max(longest, end - start + 1)
  }
  return longest
}

console.log(longestSubStrBySlideWindow('abcabcbb'))
console.log(longestSubStrBySlideWindow('pwwk'))
