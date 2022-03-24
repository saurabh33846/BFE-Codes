const flatArray = function _flatArray(inp) {
    let result = [];
    for(const elem of inp) {
        if(Array.isArray(elem)) {
            let flatedArr = _flatArray(inp)
            result = [...result, ...flatArray]
        } else {
            result.push(inp)
        }
    }
}

console.log(flatArray([1,2,3[4,[5,[6,7,8]]]]))