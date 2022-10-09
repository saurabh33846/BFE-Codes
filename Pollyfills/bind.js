

 Function.prototype.myBind = function(...args) {
    let [context, ...rest] = [...args];
    let executionFn = this;
    return function(...args2){
        return executionFn.apply(context, rest.concat(args2));
    }
  }
  
  
  this.x = 9;    // this refers to global "window" object here in the browser
  const module = {
    x: 81,
    getX: function () { return this.x; }
  };
  module.getX(); // 81
  const retrieveX = module.getX;
  console.log(retrieveX());
  // returns 9 - The function gets invoked at the global scope
  // Create a new function with 'this' bound to module
  // New programmers might confuse the
  // global const x with module's property x
  const boundGetX = retrieveX.myBind(module);
  console.log(boundGetX()); // 81
  



Function.prototype.myBind = function(...args) {
  let [context, ...rest] = [...args];
  let executionFn = this;
  return function(...args2){
      return executionFn.apply(context, rest.concat(args2));
  }
}


this.x = 9;    // this refers to global "window" object here in the browser
const module = {
  x: 81,
  getX: function () { return this.x; }
};
module.getX(); // 81
const retrieveX = module.getX;
console.log(retrieveX());
// returns 9 - The function gets invoked at the global scope
// Create a new function with 'this' bound to module
// New programmers might confuse the
// global const x with module's property x
const boundGetX = retrieveX.myBind(module);
console.log(boundGetX()); // 81

const flatArray = function _flatArray(inp) {
    let result = [];
    for(const elem of inp) {
        if(Array.isArray(elem)) {
            let iFflatedArr = _flatArray(elem)
            result = [...result, ...iFflatedArr]
        } else {
            result.push(elem)
        }
    }
 return result;
}

console.log(flatArray([1,2,3,[4,[5,[6,7,8]]]]))


/**
 * Type your code in here
 * 
 * For Logging use the log() method
 * eg. log("hello world)
 * 
 * To output a return value
 * explicitly end the code with return
 * 
 * const num = "2"
 * const double = num * 2
 * return double // this will output double
 * 
 */ 

Array.prototype.myReduce = function(func, initialVal) {
        let result;
        if(initialVal !== undefined ) {
         result = initialVal
        }
        let thisArr = this;
        let index = 0;
        for(const elem of thisArr) {
            if(result) {
                result = func.call(this, result, elem, index, thisArr);
            } else {
                result = elem;
            }
            index++;
        }
        return result;
}
const array1 = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
const initialValue = 9;
const sumWithInitial = array1.myReduce(
  (previousValue, currentValue, index) => {
    console.log(index)
    return previousValue + currentValue}, initialValue
);

console.log(sumWithInitial);
Array.prototype.newFilter = function(cb, context){
 const result = [];
 for (let index = 0;index < this.length; index++) {
  if(cb.call(context, this[index], index, this)){
   result.push(this[index])
  }
 }
 return result;
}

const numbers = [1, 2, 3, 4]
const even = numbers.newFilter(item => item % 2 === 0)
console.log(even)
