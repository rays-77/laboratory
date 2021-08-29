//函数组合

function compose(f, g) {
    return function(value) {
        return f(g(value))
    }
}


function reverse(array) {
    return array.reverse();
}


function first(array) {
    return array[0]
}


const newFun = compose(first, reverse)

console.log(newFun([1, 2, 3, 4, 5, 6]))