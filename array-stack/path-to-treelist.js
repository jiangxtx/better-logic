/**
 * paths = ['a/b/c', 'a/b/d/e', 'a/b/c/f/g']
 * [{name: 'a', children: [...]}]
 *
 * TIPS: 这是字节-豆包的一面笔试题之一。我擦，看着有思路，但是短时间内就是难以把思路转化为Codes！唉！难呐！
 * ~仲夏 2024-09-22 09:17
 */

/**
 * 【方法一📌】双重for循环
 * @param {*} paths
 */
function paths2Treelist(paths) {
  const result = []

  paths.forEach((path) => {
    const pathList = path.split('/').filter(Boolean)
    let currentLevel = result

    pathList.forEach((path) => {
      let existingNode = currentLevel.find((node) => node.name === path)
      if (!existingNode) {
        existingNode = { name: path, children: [] }
        currentLevel.push(existingNode)
      }
      currentLevel = existingNode.children
    })
  })

  return result
}

// console.log(
//   'paths2Treelist..',
//   JSON.stringify(paths2Treelist(['a/b/c', 'a/b/d/e', 'a/b/c/f/g']), null, 2)
// )

/**
 * 【方法二📌】递归法实现，看起来更加优雅！！！！
 * @param {*} paths
 */
function paths2Treelist_recursion(paths) {
  const insertPaths = (paths, nodes) => {
    if (!paths.length) return

    const [head, ...tail] = paths
    let currentNode = nodes.find((node) => node.name === head)
    if (!currentNode) {
      currentNode = { name: head, children: [] }
      nodes.push(currentNode)
    }
    insertPaths(tail, currentNode.children)
  }

  const result = []
  paths.forEach((path) => {
    const pathList = path.split('/').filter(Boolean)
    insertPaths(pathList, result)
  })
  return result
}

// console.log(
//   'paths2Treelist_recursion..',
//   JSON.stringify(paths2Treelist_recursion(['a/b/c', 'a/b/d/e', 'a/b/c/f/g']), null, 2)
// )

/**
 *  * paths = ['a/b/c', 'a/b/d/e', 'a/b/c/f/g']
 * [{name: 'a', children: [...]}]
 */
function formatAgain(paths) {
  const result = []
  paths.forEach((path) => {
    const list = path.split('/')
    let current = result
    list.forEach((path) => {
      const dest = current.find((item) => item.name === path)
      if (!dest) {
        const item = { name: path, children: [] }
        current.push(item)
        current = item.children
      } else {
        current = dest.children
      }
    })
  })
  return result
}

console.log(
  'formatAgain..',
  JSON.stringify(formatAgain(['a/b/c', 'a/b/d/e', 'a/b/c/f/g']), null, 2)
)
