const promise = new Promise(function(resolve, reject) {
    //resolve(100)

    reject(new Error("promise error"))
})


promise.then((value) => {
    console.log('resolve', value)
}, (err) => {
    console.log('reject', err)
})

console.log("end")