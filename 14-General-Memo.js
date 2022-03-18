/**
 * @param {Function} func
 * @param {(args:[]) => string }  [resolver] - cache key generator
 */
function memo(func, resolver) {
  // your code here
  const map = new Map();
  const memoedFn = function(){
    let key;
    if(resolver && typeof resolver === 'function') {
      key = resolver(...arguments);
    } else {
      key = [...arguments].join("_");
    }
     if(!map.has(key)) {
        let val = func.apply(this,[...arguments]);
        map.set(key, val);
      }
      return map.get(key);
  }
  return memoedFn;
}
function funcThis(b){
  return `${this.a}_${b}`
}
const memoed = memo(funcThis)
const a = {
  a: 1,
  memoed
}
