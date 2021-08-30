/*
自行实现promise：
1. Promise 一个类，在初始化类的时候，需要传递一个“执行器”，该执行器会立即执行。

2. Promise 中有三种状态，分别为：( 成功【fulfilled】、失败【rejected】、等待【pending】 )

状态变化：一旦状态确定了，就不可以再更改。
    pending 状态 -> fulfilled
    pending 状态 -> rejected

3. 【resolve】和【reject】函数是用来更改状态的。
    resolve : fulfilled
    reject: rejected

4. then 方法内部做的事情 就是判断状态，如果状态是成功，就调用成功的回调函数；如果状态是失败，就调用失败回调函数；
then方法是被定义在原型对象中的，因为每一个promise实例对象，都会用到。

5. then 方法回调有一个参数，表示成功之后的值，then失败回调有一个参数，表示失败后的原因（或异常信息）

6. 同一个promise对象下面的then方法是可以被调用多次的。

7. then方法是可以被链式调用的，后面then的回调函数拿到值得是上一个then方法的回调函数的返回值。
*/


const myPromise = require("./my-promise");

function promise1(){
    return new myPromise(function(resolve,reject){
        setTimeout(function(){
            resolve('promise1 已执行')
        },3000)
    })
}


function promise2(){
    return new myPromise(function(resolve,reject){
        reject("promise2 执行失败")
    })
}


promise2()
    .then(value=> console.log(value))
    .catch(error=> console.log(error))