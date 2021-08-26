//普通的纯函数
// function checkAge(min, age) {
//     return age >= min
// }


// console.log(checkAge(18, 20))
// console.log(checkAge(18, 20))
// console.log(checkAge(22, 25))


//函数柯里化
// function checkAge(min) {
//     return function(age) {
//         return age >= min
//     }
// }

//柯里化：当一个函数有多个函数的时候，先传递一部分的参数调用它（这部分参数之后永远不变）
//然后返回一个新的函数接受剩余的参数，返回结果
//ES6
let checkAge = (min) => (age => age >= min)

let checkAge18 = checkAge(18)
let checkAge20 = checkAge(20)

console.log(checkAge18(16))
console.log(checkAge20(25))