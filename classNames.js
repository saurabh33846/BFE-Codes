/**
 * @param {any[]} args
 * @returns {string}
 */
function classNames(...args) {
  // your code here
  /*
  1. String -> Append it to op
  2. Number -> Append it to op
  3 Object -> Simple / Array -> SImple -> loop over keys and append -> Array -> flattern it and then only append -> Recursion

  Return String 
  */

  let outPut = [];
  for (const key of args) {
    if(!key) {
      continue;
    }
    if(typeof key === 'string' || typeof key === 'number') {
      outPut.push(key);
      continue;
    }
    if(Array.isArray(key)) {
      outPut.push(classNames(...key));
      continue;
    }
    if(typeof key === 'object') {
      outPut.push(classNames(...Object.keys(key).filter((k)=>!!key[k])))
    }
  }
  return outPut.join(" ");  
}

//console.log(classNames('BFE', 'dev', 100))
// console.log(classNames(null, undefined, Symbol(), 1n, true, false))
// const obj = new Map()
// obj.cool = '!'
//  console.log(classNames(['BFE', [{dev: true}, ['is', [obj]]]]))
