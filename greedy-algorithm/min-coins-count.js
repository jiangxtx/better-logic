/**
 * 【📌】最少硬币个数问题【leetcode-322. 零钱兑换】
 *
 * 给你一个整数数组 coins ，表示不同面额的硬币；以及一个整数 amount ，表示总金额。
 * 计算并返回可以凑成总金额所需的 最少的硬币个数 。如果没有任何一种硬币组合能组成总金额，返回 -1 。
 * ext:
 *  - coins = [1,2,5], amount = 4, → 2（2/2）
 *  - coins = [1,2,5], amount = 12, → 3（5/5/2）
 *  - coins = [1,2,5,7,10], amount = 12, → 2（10/2）
 *  - coins = [1,2,5,7,10], amount = 14, → 2（7/7） !not 3(10/2/2)
 *  - coins = [1,2,5,7,10], amount = 16, → 3（10/5/1）
 */

const calcMax = (amount, coins) => {
  let amountTmp = amount
  let total = 0
  for (let i = coins.length - 1; i >= 0; i--) {
    total += ~~(amountTmp / coins[i])
    let rest = amountTmp % coins[i]
    if (rest === 0) {
      return total
    }
    amountTmp = rest
  }
  return -1
}

/**
 * ❎ ❌ 思路是错误的😂！
 * 唉，搞得我都要崩溃了！自测几个简单的示例，通过了。然后在leetcode上测试用例也通过了，结果提交时，在大量测例面前，暴露了！没通过！
 * 我勒个擦！最后，还是看题解，获得了思路 → 动态规划！~仲夏 2024-08-03 00:08
 */
function minCoinsCount(amount, coins) {
  coins = coins.filter((i) => i <= amount).sort()
  const result = coins
    .map((_, index) => {
      const max = calcMax(amount, coins.slice(0, index + 1))
      // console.log('max...', max, amount, coins.slice(0, index + 1))
      return max
    })
    .sort((a, b) => (a > b ? -1 : 1))
  return result[result.length - 1]
}

console.log(
  'minCoinsCount: ',
  minCoinsCount(6249, [186, 419, 83, 408]), // 应该输出 20
  minCoinsCount(14, [1, 2, 5, 7, 10])
)

/**
 * 【📌】动态规划法的思想来解决 ✅
 * @param {*} amount
 * @param {*} coins
 * @returns
 */
function minCoinsCountDp(amount, coins) {
  // f(i) 表示 金额为i时的最少硬币个数，f(i)[i<0] = -1
  const dp = []
  dp[0] = 0
  if (amount < 1) {
    return dp[amount]
  }

  // 如果dp中对应的数据为null 或者为-1，表明没有命中
  const calcItem = (item) => (item == null || item === -1 ? -1 : item)

  for (let i = 1; i <= amount; i++) {
    // 💡这里体现的是动态规划的计算公式
    const items = coins.map((coin) => calcItem(dp[i - coin])).filter((item) => item !== -1)
    dp[i] = items.length < 1 ? -1 : Math.min(...items) + 1
  }
  return dp[amount]
}

console.log(
  'minCoinsCountDp: ',
  minCoinsCountDp(6249, [186, 419, 83, 408]), // 应该输出 20
  minCoinsCountDp(14, [1, 2, 5, 7, 10])
)
