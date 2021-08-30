function ajax(url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("get", url);
        xhr.responseType = 'json'
        xhr.onload = function() {
            if (this.status == 200) {
                resolve(this.response)
            } else {
                reject(new Error(this.statusText))
            }
        }
        xhr.send()
    })
}



ajax('/api/users.json').then(res => {
    console.log(res)
}, error => {
    console.log(error)
})


