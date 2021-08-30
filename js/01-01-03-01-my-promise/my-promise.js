//自己实现Promise类

class myPromise {
  //promise默认构造函数 (executor ： 执行器)
  constructor(executor) {
    executor(this.resolve, this.reject)
  }

  resolve = () => {}

  reject = () => {}
}
