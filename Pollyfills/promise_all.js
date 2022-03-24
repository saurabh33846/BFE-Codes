const promiseAll = function(promises) {
    if(!Array.isArray(promises)) {
        throw new Error("Please input array of promises")
    }
    const result = [];
    const len = promises.length;
    const count = 0;

    return new Promise((resolve, reject)=>{
       promises.forEach((promise, index)=>{
           if(!(promise && promise.then)) {
               promise = Promise.resolve(promise);
           }
           promise.then((value)=>{
               result[index] = value;
               count++;
               if(count === len) {
                   resolve(result);
               }
           }).catch((err)=>{
               reject(err)
           })
       })
    })
}

// Testing code 

var p11 = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        resolve("saurabh")
    }, 1000)
})
var p12 = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        resolve("kumar")
    }, 100)
})
var p13 = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        reject("kumarvalle")
    }, 100)
})

promiseAll([p11, p12, p13]).then((resp)=>{
    console.log(resp);
}).catch((err)=>{
    console.log(err)
})