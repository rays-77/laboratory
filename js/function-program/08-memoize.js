//带记忆功能的函数
//1.可缓存结果
//2.可测试
//3.可并行处理,纯函数不需要访问共享的内存数据, webworker可开启多线程

const _ = require("lodash")

function getArea(r) {
    console.log(`圆半径 -> ${r}`)
    return Math.PI * r * r;
}

let getAreaWithMemory = _.memoize(getArea);

console.log(getAreaWithMemory(3))
console.log(getAreaWithMemory(3))
console.log(getAreaWithMemory(3))
console.log(getAreaWithMemory(3))



console.log("===============================")

function memoize(fn) {
    let cache = {}
    return function() {
        //将参数的json字符串作为key
        let key = JSON.stringify(arguments)
        cache[key] = cache[key] || fn.apply(fn, arguments)
        return cache[key]
    }
}


let getAreaWithMemory1 = memoize(getArea);

console.log(getAreaWithMemory1(4))
console.log(getAreaWithMemory1(4))
console.log(getAreaWithMemory1(4))
console.log(getAreaWithMemory1(4))