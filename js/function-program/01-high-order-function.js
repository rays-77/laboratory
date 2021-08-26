//高阶函数 - 函数作为参数
//1.可以把函数作为参数传递给另外有一个函数
//2.可以把函数作为另外一个函数的返回结果

//意义：
//高阶函数： 抽象可以帮我们屏蔽细节，只需要关注与我们的目标
//高阶函数是用来抽象通用的问题。

function forEach(array, fn) {
    for (let i = 0; i < array.length; i++) {
        //fn来处理数组中的每一个元素
        fn(array[i])
    }
}

//测试

let arr = [1, 2, 3, 4, 5, 6, 7, 8]
forEach(arr, function(item) {
    console.log(item)
});


console.log("===============================")


//过滤数组，fn寻找来满足条件的元素
function filter(arr, fn) {
    let result = []
    for (let i = 0; i < arr.length; i++) {
        if (fn(arr[i])) {
            result.push(arr[i])
        }
    }
    return result;
}

//测试
let newArr = filter(arr, (item) => {
    return item % 5
})
console.log(newArr)


console.log("===============================")


//高阶函数 - 函数作为返回值

function makeFun() {
    let msg = 'hello rays77'
    return function() {
        console.log(msg)
    }
}
const fn = makeFun();
fn();

makeFun()();


console.log("===============================")


//once是的实现。模拟函数只执行一次

function once(fn) {
    let done = false;
    return function() {
        if (!done) {
            done = true;
            return fn.apply(this, arguments)
        }
    }
}


//测试
let pay = once(function(money) {
    console.log(`支付了-> ${money} RMB`)
})

pay(5)
pay(5)
pay(5)
pay(5)