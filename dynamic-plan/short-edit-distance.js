/**
 * 最短编辑距离
 * ext. 对于字符串"xyz"和"xcz"，它们的最短距离是1。即 y → c。
 * 设 A 和 B 是两个字符串。我们要用最少的字符操作次数，将字符串 A 转换为字符串 B。这里所说的字符操作共有三种：
  删除一个字符；
  插入一个字符；
  将一个字符改为另一个字符。
 */

// ❌ bug!💩！shortDistance('gfdg', 'sfdqxb') → 3 了，实际上应该是 4！
function shortDistance(str1, str2) {
  const m = str1.length + 1
  const n = str2.length + 1
  const dp = []
  // 初始化
  for (let i = 0; i <= m; i++) {
    dp[i] = []
    dp[i][0] = i
  }
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j
  }
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1)
      if (str1[i] === str2[j]) {
        dp[i][j] = Math.min(dp[i][j], dp[i - 1][j - 1])
      } else {
        dp[i][j] = Math.min(dp[i][j], dp[i - 1][j - 1] + 1)
      }
    }
  }
  // console.log('dp: ', dp)
  // return dp[m][n]
  return dp[m - 1][n - 1]
}

// console.log('shortDistance: ', shortDistance('sunday', 'saturday'))
// console.log('shortDistance: ', shortDistance('sfdqxbw', 'gfdgw'))
console.log('shortDistance: ', shortDistance('gfdg', 'sfdqxb'))

/**
 * ✅ AI 写的 → → →
 * @param {*} str1
 * @param {*} str2
 * @returns
 */
function minEditDistance(str1, str2) {
  const m = str1.length
  const n = str2.length

  // 初始化DP表格
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0))

  // 初始化边界条件
  for (let i = 0; i <= m; i++) {
    dp[i][0] = i
  }
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j
  }

  // 填充DP表格
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1, // 删除
          dp[i][j - 1] + 1, // 插入
          dp[i - 1][j - 1] + 1 // 替换
        )
      }
    }
  }

  return dp[m][n]
}

// 示例使用
console.log(`最短编辑距离是: ${minEditDistance('gfdg', 'sfdqxb')}`)
