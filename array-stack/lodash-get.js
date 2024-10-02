/**
 * 【📌】实现一个按指定路径获取属性的get方法。
    题目描述
    function get() {
      // 请补全函数参数和实现逻辑
    }
    const obj = { selector: { to: { douyin: 'FE coder' } }, target: [1, 2, { name: 'byted' }] };
    // 运行代码
    get(obj, 'selector.to.douyin', 'target[0]', 'target[2].name')
    //  输出结果：
    // ['FE coder', 1, 'byted']
 */

/**
 * 取值逻辑实现
 * 本质上就是 lodash中get方法的实现
 * @param {*} obj
 * @param  {...any} keys key集合
 */
function get(obj, ...keys) {
  return keys.map((key) => pickValue(obj, key2Keys(key)))
}

/**
 * 主要考虑两种情形：1. "."的解析，2. "[xx]"中括号的解析。
 * 🔥如何把 key[a].str[b][c] 解析为 → [key, a, str, b, c]
 * @param {*} key
 */
function key2Keys(key = '') {
  return key
    .replace(/\[(\w+)\]/g, '.$1') // 这是难点🔥，也可以使用 .replace(/\[(.*?)\]/g, '.$1') ✅（非贪婪匹配），但是不能是 .replace(/\[(.*)\]/g, '.$1')❎（贪婪匹配）
    .split('.')
    .filter(Boolean)
}

function pickValue(obj, keys) {
  let destObj = obj
  let key
  while (destObj && (key = keys.shift())) {
    destObj = destObj[key]
  }
  return keys.length ? undefined : destObj
}

console.log(
  'get>> ',
  get(
    { selector: { to: { douyin: 'FE coder' } }, target: [1, 2, { name: 'byted' }] },
    'selector.to.douyin',
    'target[0]',
    'target[2].name',
    'target[2].name[1].sd',
    'target.2.name'
  )
)
