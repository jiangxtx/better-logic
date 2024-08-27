const list = [
  { id: 122, name: 'jack_122', pid: 12 },
  { id: 2, name: 'jack_2', pid: 0 },
  { id: 4, name: 'jack_4', pid: 0 },
  { id: 11, name: 'jack_11', pid: 1 },
  { id: 12, name: 'jack_12', pid: 1 },
  { id: 22, name: 'jack_22', pid: 2 },
  { id: 3, name: 'jack_3', pid: 0 },
  { id: 1, name: 'jack_1', pid: 0 },
]

/* 递归解法 */
function list2Treelist(list, pid = 0) {
  if (list.length < 1) return []

  const dest = list.filter((t) => t.pid === pid)
  const rest = list.filter((t) => t.pid !== pid)
  dest.forEach((item) => {
    return (item.children = list2Treelist(rest, item.id))
  })
  return dest
}

console.log('list2Treelist: ', list2Treelist(list))
console.log(JSON.stringify(list2Treelist(list), null, 2))

/**
 * map映射法.
 * TIPS：这种效率会更高
 * @param {*} list
 * @param {*} pid
 * @returns
 */
function list2Treelist_map(list, pid = 0) {
  const map = list.reduce((acc, item) => {
    item.children = []
    acc[item.id] = item
    return acc
  }, {})
  const result = []
  for (const item of list) {
    if (item.pid === pid) {
      result.push(item)
    } else {
      map[item.pid].children.push(item)
    }
  }
  return result
}

console.log('list2Treelist_map: ', list2Treelist_map(list))
console.log(
  JSON.stringify(list2Treelist_map(list), null, 2) === JSON.stringify(list2Treelist(list), null, 2)
)
