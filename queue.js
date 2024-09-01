class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

/**
 * 队列 - 数据结构
 */
class Queue {
  constructor() {
    // init Queue DataStructure
    this.clear()
  }

  // 入列
  enqueue(value) {
    this._size++
    const node = new Node(value)

    if (!this.head) {
      this.head = node
      this.tail = node
      return
    }

    this.tail.next = node
    this.tail = node
  }

  // 出列
  dequeue() {
    if (this.head) {
      const current = this.head.value
      this.head = this.head.next
      this._size--
      return current
    }
  }

  // 比直接定义一个方法 size() 更妙！🔥
  get size() {
    return this._size
  }

  clear() {
    this._size = 0
    this.head = null
    this.tail = null
  }

  // 迭代遍历
  *[Symbol.iterator]() {
    let current = this.head
    while (current) {
      yield current.value
      current = current.next
    }
  }
}

export default Queue

/* FOR TEST... */

const queue = new Queue()
queue.enqueue('cool')
queue.enqueue('Jackson')
queue.enqueue({ name: 'jack' })

console.log('queue 1>> ', ...queue, queue.size)
console.log('queue 2>> ', queue.dequeue(), 'queue → ', ...queue, queue.size)
