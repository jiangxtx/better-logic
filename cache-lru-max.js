/**
 * 【📌】设计一个对象cache, 他支持下列两个基本操作:​
    set(id, object), 根据id设置对象;​
    get(id): 根据id得到一个对象;​
    同时它有下面几个性质:​
    1: x秒自动过期, 如果cache内的对象, x秒内没有被get或者set过, 则会自动过期;​
    2: 对象数限制, 该cache可以设置一个n, 表示cache最多能存储的对象数;​
    3: LRU置换, 当进行set操作时, 如果此时cache内对象数已经到达了n个, 则cache自动将最久未被使用过的那个对象剔除, 腾出空间放置新对象;​
 */

class LruCache {
  constructor(validTs = 3600, max = 10) {
    this.validTs = validTs * 1000 // 最大有效期（秒）
    this.max = max // 最多存储数
    /**
     * 1. 列表中每一项的值为 {key: xxx, value: xxx, expired: timestamp } 形式
     * 2. 列表的顺序即为 LRU 的顺序
     */
    this.list = []

    this._clear()
  }

  set(key, value) {
    const index = this.list.findIndex((item) => item.key === key)
    const item = {
      key,
      value,
      expired: Date.now() + this.validTs,
    }
    // 已有的key场景
    if (index > -1) {
      this.list.splice(index, 1)
      this.list.push(item)
      return
    }

    if (this.list.length >= this.max) {
      this.list.shift()
    }
    this.list.push(item)
  }

  get(key) {
    const index = this.list.findIndex((item) => item.key === key)
    if (index < 0) return

    const item = this.list[index]
    item.expired = Date.now() + this.validTs
    this.list.splice(index, 1)
    this.list.push(item)
    return item.value
  }

  _clear() {
    const now = Date.now()
    this.list = this.list.filter((item) => item.expired <= now)
    // 每隔一秒，自动清洗一次数据
    setTimeout(() => this._clear(), 1000)
  }
}

/* **************** TEST **************** */
/* **************** TEST **************** */
/* **************** TEST **************** */

const caches = new LruCache(60, 5)
console.log(caches.get('id_1'))
caches.set('id_1', { name: 'jack1' })
caches.set('id_2', { name: 'jack2' })
caches.set('id_3', { name: 'jack3' })
caches.set('id_4', { name: 'jack4' })
caches.set('id_5', { name: 'jack5' })
caches.set('id_6', { name: 'jack6' })
