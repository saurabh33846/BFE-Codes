function debounce(fn, wait, options= {leading:false, trailing:true}) {

    let timer = null;
    let lastarg = null;


    return function _debounce(...args) {

        if(!timer && options.leading) {
            fn.apply(this, args);
        } else {
            lastarg = args;
        }
        if(timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(()=>{
            if(option.trailing && lastarg) {
                fn.apply(this, lastarg)
                lastarg = null;
                timer = null;
            }
        }, wait)
        
    }
}
