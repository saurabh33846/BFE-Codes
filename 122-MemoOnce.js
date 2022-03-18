
/**
 * @param {Function} func
 * @param {(args: any[], newArgs: any[]) => boolean} [isEqual]
 * @returns {any}
 */
const dfEqual = (arg1, arg2)=>{
  return JSON.stringify(arg1) === JSON.stringify(arg2);
}
function memoizeOne(func, isEqual=dfEqual) {
  // your code here
  let cache = {};
  let _memoOne = function (...args) {
    if(cache.self === this && isEqual(args, cache.args)) {
      return cache.value;
    }
    cache.self = this;
    cache.value = func.apply(this, args);
    cache.args = args;
    return cache.value
  }
  return _memoOne;
}
