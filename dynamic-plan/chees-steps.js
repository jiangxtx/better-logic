/**
 * 【📌】棋子走法
 * 原点为（0, 0），目标位置为（M, N）。要求只能向上 or 向右走，一次走一格。问从（0, 0）→ （M, N）一共有多少种走法？
 * 思路：
 *  - 二维坐标表示
 *  - 公式为：f(i, j) = f(i-1, j) + f(i, j-1), 其中f(0,0)=0, f(1,0)=1, f(0,1)=1, f(1,1)=2
 *  - 本质上就是二维的兔子数列
 */
function cheesSteps(m, n) {
  // create dp list
  const dp = []
  for (let i = 0; i < m + 1; i++) {
    dp.push(Array.from({ length: n + 1 }).fill(0))
  }

  // init data
  for (let i = 1; i < m + 1; i++) {
    dp[i][0] = 1
  }
  for (let j = 1; j < n + 1; j++) {
    dp[0][j] = 1
  }

  // dynamic calculate
  for (let i = 1; i < m + 1; i++) {
    for (let j = 1; j < n + 1; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
    }
  }
  return dp[m][n]
}

console.log('cheesSteps: ', cheesSteps(1, 2), cheesSteps(3, 4))
