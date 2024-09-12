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

// cache raw firstly
const PrimaryXHR = window.XMLHttpRequest

class EnhancedXHR extends PrimaryXHR {
  constructor(options) {
    super()
    this.PrimaryXHR = PrimaryXHR
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

  set onreadystatechange(callback) {
    this.__onreadystatechange = callback
    super.onreadystatechange = () => {
      // 一、业务监听优先处理
      this.__onreadystatechange?.()

      // 二、内部钩子处理：ajax请求OK
      if (this.readyState === 4) {
        const { onSuccess } = this.options
        onSuccess &&
          onSuccess({
            status: this.status,
            data: JSON.parse(this.responseText),
          })
      }
    }
  }

  get onreadystatechange() {
    return this.__onreadystatechange
  }
}

window.XMLHttpRequest = EnhancedXHR

const test = () => {
  const xhr = new XMLHttpRequest({
    afterOpen: () => {
      console.log('afterOpen>>>>: ')
    },
    onSuccess: (data) => {
      console.log('onSuccess...', data)
    },
  })
  xhr.open('post', 'http://localhost:8080/api/papi/decision_reason/query', true)
  xhr.onreadystatechange = () => {
    console.log('statechange...', xhr.readyState, xhr.status)
    if (xhr.readyState === 4) {
      console.log('done...', xhr.status, JSON.parse(xhr.responseText))
    }
  }
  xhr.send()
}
test()
