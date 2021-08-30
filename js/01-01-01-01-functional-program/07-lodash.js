//lodash 高阶函数
const _ = require("lodash")


const array = ['jack', 'marry', 'tom', 'kate']

console.log(_.first(array))
console.log(_.last(array))


console.log(_.toUpper(_.first(array)))

//反转
console.log(_.reverse(array))

const r = _.each(array, (item, index) => {
    console.log(item, index)
})

console.log(r)