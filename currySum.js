function sumCurried(val1) {
    let result = val1;
    if(val1) {
        return function _sumCurried(val2) {
            if(val2 === undefined) {
                return result;
            }
            result = result + val2;
            return _sumCurried;
        }
    }
    
}

// Another Version 

function sumCurried(val) {

    let sum = val;
    var returnFn =  function (val) {
        if(arguments.length === 0) {
            return sum
        }
        sum = sum + val;
        return returnFn;
    }
    return returnFn;
}

sumCurried(1)(2)(4)(6)()
