function sum(a, b, c) {
    return a + b + c;
  }
  
  let curriedSum = curry(sum);
  
  alert( curriedSum(1, 2, 3) ); // 6, still callable normally
  alert( curriedSum(1)(2,3) ); // 6, currying of 1st arg
  alert( curriedSum(1)(2)(3) ); // 6, full currying
  
  function curry(func) {
   return function curried(...args) {
    if(args.length === func.length) {
     return func.apply(this, args)
    } 
    return function(...args2) {
     return curried.apply(this,args.concat(args2))
    }
   }
  }