/**
 * 【📌】目标：重写 XMLHttpRequest，使得各个环节能够追加钩子函数🪝。
 *  Sample Codes::::::::
 *    → → → 
        const xhr = new XMLHttpRequest()
        xhr.open('post', 'http://localhost:8080/api/papi/decision_reason/query', true)
        xhr.onreadystatechange = () => {
            console.log('statechange...',xhr.readyState, xhr.status);
            if (xhr.readyState === 4) {
                console.log('done...', xhr.status, JSON.parse(xhr.responseText));
            }
        }
        xhr.send();
 */

// 先备份一份原始 XMLHttpRequest
const PrimaryXHR = window.XMLHttpRequest

class EnhancedXHR extends PrimaryXHR {
  constructor(options) {
    // TIPS：在派生类的构造函数中，必须首先调用 super()，然后才能使用 this
    super()
    this.options = options || {}
    // 暂存业务设置的onreadystatechange值
    this.__onreadystatechange = null
  }

  open(...args) {
    // 不能是this.open(),否则会死循环从而导致栈溢出Error！
    super.open(...args)
    const { afterOpen } = this.options
    afterOpen && afterOpen()
  }
  send(...args) {
    super.send(...args)
    const { afterSend } = this.options
    afterSend && afterSend()
  }

  // onreadystatechange() {
  //   this.onreadystatechange
  // }

  /**
   * 截获并重改 onreadystatechange 属性的设置，以便安插自定义钩子函数
   */
  set onreadystatechange(callback) {
    this.__onreadystatechange = callback
    super.onreadystatechange = () => {
      // 一、业务监听优先处理
      callback?.()

      // 二、内部钩子处理：
      // 1）ajax请求成功：状态为4 且 请求状态码为200/204/等
      if (this.readyState === 4 && /20\d/.test(this.status)) {
        const { onSuccess } = this.options
        const data = {
          status: this.status,
          data: this.responseText,
        }
        onSuccess && onSuccess(data, this)
      }

      // 2）ajax请求失败：状态为4 且 请求状态码不以2开头
      if (this.readyState === 4 && !/^2/.test(this.status)) {
        const { onError } = this.options
        onError && onError(this.status, this)
      }
    }
  }

  get onreadystatechange() {
    return this.__onreadystatechange
  }
}

window.XMLHttpRequest = EnhancedXHR

/* ***************************  FOR TEST  ************************************* */
/* ***************************  FOR TEST  ************************************* */

const test = () => {
  const xhr = new XMLHttpRequest({
    afterOpen: () => {
      console.log('afterOpen>>>>: ')
    },
    onSuccess: (data, res) => {
      console.log('onSuccess...', data, res)
    },
    onError: (data, res) => {
      console.log('onError...', data, res)
    },
  })
  xhr.open('post', 'http://localhost:8080/api/papi/decision_reason/query', true)
  xhr.onreadystatechange = () => {
    console.log('statechange...', xhr.readyState, xhr.status)
    if (xhr.readyState === 4) {
      console.log('done...', xhr.status)
    }
  }
  xhr.send()
}
test()
