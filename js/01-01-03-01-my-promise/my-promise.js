//自己实现的Promise类

const PENDING = 'pending' //等待
const FULFILLED = 'fulfilled' //成功
const REJECTED = 'rejected' //失败

class MyPromise {
  //promise默认构造函数 (executor ： 执行器)
  constructor(executor) {
    try {
      //1.捕获执行器的异常
      executor(this.resolve, this.reject)
    } catch (error) {
      return this.reject(error)
    }
  }

  status = PENDING
  //返回成功之后的值
  value = undefined
  //返回失败之后的原因
  reason = undefined

  //成功回调
  successCallback = []
  //失败回调
  failCallback = []

  resolve = (value) => {
    //如果状态不是等待状态,组织程序向下执行
    if (this.status !== PENDING) return
    //将状态变更为：成功
    this.status = FULFILLED
    //保存成功之后的值
    this.value = value
    //处理异步调用情况，判断是否存在成功回调，如果存在，即调用
    //this.successCallback && this.successCallback(this.value)
    while (this.successCallback.length) this.successCallback.shift()()
  }

  reject = (reason) => {
    //如果状态不是等待状态,组织程序向下执行
    if (this.status !== PENDING) return
    //将状态变更为：失败
    this.status = REJECTED
    //保存失败之后的原因
    this.reason = reason
    //处理异步调用情况，判断是否存在失败回调，如果存在，即调用
    //this.failCallback && this.failCallback(this.reason)
    while (this.failCallback.length) this.failCallback.shift()()
  }

  then(successCallback, failCallback) {
    successCallback = successCallback ? successCallback : (value) => value
    failCallback = failCallback
      ? failCallback
      : (reason) => {
          throw reason
        }
    let promise2 = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let result = successCallback(this.value)
            // 判断 result 的值是普通值还是promise对象
            // 如果是普通的值 直接调用resolve
            // 如果是promise对象 查看promise对象返回的结果
            // 再根据promise对象返回的结果 决定调用resole 还是调用reject
            resolvePromise(promise2, result, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      } else if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let result = failCallback(this.reason)
            // 判断 result 的值是普通值还是promise对象
            // 如果是普通的值 直接调用resolve
            // 如果是promise对象 查看promise对象返回的结果
            // 再根据promise对象返回的结果 决定调用resole 还是调用reject
            resolvePromise(promise2, result, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      } else {
        //等待状态时。将成功回调和失败回调存储起来
        this.successCallback.push(() => {
          setTimeout(() => {
            try {
              let result = successCallback(this.value)
              // 判断 result 的值是普通值还是promise对象
              // 如果是普通的值 直接调用resolve
              // 如果是promise对象 查看promise对象返回的结果
              // 再根据promise对象返回的结果 决定调用resole 还是调用reject
              resolvePromise(promise2, result, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
        this.failCallback.push(() => {
          setTimeout(() => {
            try {
              let result = failCallback(this.reason)
              // 判断 result 的值是普通值还是promise对象
              // 如果是普通的值 直接调用resolve
              // 如果是promise对象 查看promise对象返回的结果
              // 再根据promise对象返回的结果 决定调用resole 还是调用reject
              resolvePromise(promise2, result, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
      }
      //判断状态
    })
    return promise2
  }

  finally(callback) {
    return this.then(
      (value) => {
        return MyPromise.resolve(callback()).then(() => value)
      },
      (reason) => {
        return MyPromise.resolve(callback()).then(() => {
          throw reason
        })
      }
    )
  }

  catch(failCallback) {
    return this.then(undefined, failCallback)
  }

  //静态方法
  static all(array) {
    let result = []
    let index = 0
    return new MyPromise((resolve, reject) => {
      function addData(key, value) {
        result[key] = value
        index++
        //等全部执行完，再返回promise
        if (index === array.length) resolve(result)
      }

      for (let i = 0; i < array.length; i++) {
        let current = array[i]
        //判断当前是promise对象还是正常值
        if (current instanceof MyPromise) {
          //promise对象
          current.then(
            (value) => addData(i, value),
            (reason) => reject(reason)
          )
        } else {
          //普通值
          addData(i, array[i])
        }
      }
    })
  }

  //返回promise 静态方法
  static resolve(value) {
    if (value instanceof MyPromise) return value
    return new MyPromise((resolve) => resolve(value))
  }
}

function resolvePromise(promise2, result, resolve, reject) {
  //判断 promise2 与 返回的promise是不是相等
  if (promise2 === result) {
    return reject(
      new TypeError('Chaining cycle detected for promise #<Promise>')
    )
  }

  if (result instanceof MyPromise) {
    //Promise对象,直接传递resolve,或者reject传递到下一个promise对象
    result.then(resolve, reject)
  } else {
    //普通值
    resolve(result)
  }
}

module.exports = MyPromise
