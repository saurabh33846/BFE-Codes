




/**
 * interface Matcher {
 *  toBe(data: any): void
 * }
 */
/**
 * @param {any} input
 * @returns {Matcher & {not: Matcher}}
 */
function myExpect(input) {
  // your code here
  const toBe = (inp, negate)=>{
    let areEqual = Object.is(input, inp);
    if(negate) {
      areEqual = !areEqual;
    }
    if(!areEqual) {
      throw new Error("No equal")
    }
    return true;
  }
  const not= {
    toBe:(inp)=>{
      return toBe(inp, true)
    }
  }
  return {
    toBe, not
  }
}



