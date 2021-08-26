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
console.log(findSpaceStr(['rays 77', 'rays77']))