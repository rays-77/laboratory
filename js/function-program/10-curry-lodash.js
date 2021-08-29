//柯里化案例

const _ = require("lodash")

//判断字符串是否符合正则表达式规则
const match = _.curry(function(reg, str) {
    return str.match(reg)
})

const haveSpace = match(/\s+/g)
const haveNumber = match(/\d+/g)

//过滤数组中，满足条件的元素
const filter = _.curry(function(func, arr) {
    return arr.filter(func)
})


const findSpaceStr = filter(haveSpace)

//找出数组中包含有空格的元素，并且返回数组
console.log(findSpaceStr(['rays 77', 'rays77', 'hello world', 'hey,man']))


//柯里化原理模拟

function curry(func) {
    return function curriedFn(...args) {
        //判断实参和形参的个数
        if (args.length < func.length) {
            return function() {
                return curriedFn(...args.concat(Array.from(arguments)))
            }
        }
        return func(...args)
    }
}


function getSum(a, b, c) {
    return a + b + c;
}

const curried = curry(getSum)

console.log(curried(1, 2, 3))
console.log(curried(1)(2, 3))
console.log(curried(1, 2)(3))