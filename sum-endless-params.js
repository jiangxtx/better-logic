const argsList = []

function sum(...args) {
  const list = args.filter((i) => !Number.isNaN(i) && typeof i === 'number')
  argsList.push(...list)
  return sum
}
sum.sumOf = () => {
  const total = argsList.reduce((acc, cur) => ((acc += cur), acc), 0)
  argsList.length = 0
  return total
}

/* TEST */
/* TEST */

console.log(sum(1, 2, 3, 4).sumOf())
console.log(sum(1, 2, 3, 4)(2, 3).sumOf())
console.log(sum(1, 2, 3, 4)(2, 3)(4)(5).sumOf())

/**
 * 上面的实现，功能上满足诉求了，但是不够内聚，不够优雅！我们试着改进一下 → →
 * 采用 Class 来高内聚一波
 */
class Sum {
  constructor() {
    this.argsList = [] // cache all params
  }

  sum = (...args) => {
    const list = args.filter((i) => !Number.isNaN(i) && typeof i === 'number')
    this.argsList.push(...list)
    return this.sum
  }

  sumOf = () => {
    const total = this.argsList.reduce((acc, cur) => ((acc += cur), acc), 0)
    // clear caches after calcuated
    this.argsList.length = 0
    return total
  }
}

const sumInstance = new Sum()
const isum = sumInstance.sum
isum.sumOf = sumInstance.sumOf

// export default isum
module.export = isum

/* TEST */
/* TEST */

console.log('isum: ', sum(1, 2, 3, 4).sumOf())
console.log('isum: ', sum(1, 2, 3, 4)(2, 3).sumOf())
console.log('isum: ', sum(1, 2, 3, 4)(2, 3)(4)(5).sumOf())
