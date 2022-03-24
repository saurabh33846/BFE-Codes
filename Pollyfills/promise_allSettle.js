let promiseAllSettle = (inp)=>{

    return new Promise((resolve, reject)=>{
         let len = inp.length;
        
        let p1 = Promise.resolve();
        let final = [];
        inp.forEach((pr, index)=>{
            p1 = pr.then((op)=>{
                final[index] = op;
                len--;
                if(len === 0) {
                    resolve(final)
                }
            }).catch((e)=>{
                final[index] = e;
                len--;
                if (len === 0) {
                    resolve(final)
                }
            })
        })
    })
}