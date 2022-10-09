
// interface Laziness {
//   sleep: (time: number) => Laziness
//   sleepFirst: (time: number) => Laziness
//   eat: (food: string) => Laziness
// }

/**
 * @param {string} name
 * @param {(log: string) => void} logFn
 * @returns {Laziness}
 */
function LazyMan(name, logFn) {
  // your code here
  let outcomeA = [];
    outcomeA.push(Promise.resolve({value:`Hi, I'm ${name}`}))
  setTimeout(async ()=>{
    for (const prom of outcomeA) {
      let {value} = await prom;
      logFn.apply(this, [value])
    }
  }, 0)

  let op =  {
    eat:function(dishName){
      outcomeA.push(Promise.resolve({
        value:`Eat ${dishName}`,
        async: false
      }))
      return this;
    },
    sleep :function(time){
      outcomeA.push(resolveWithDelay(time, {value:`Wake up after ${time} seconds`}))
      return this;
    },
    sleepFirst:function(time){
        outcomeA.splice(0, 0,resolveWithDelay(time, {value:`Wake up after ${time} seconds`}))
      return this;
    }
  }
  return op;
}
function resolveWithDelay(delay, value) {
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
      resolve(value)
    }, delay)
  })
}

const log = (str) => {
  log.logs.push(str)
}
log.logs = []
LazyMan('Jack', log).eat('banana').eat('apple')
// Hi, I'm Jack.
// setTimeout(() => {
//   expect(log.logs.slice()).toEqual(["Hi, I'm Jack."])
//   done()
// }, 0)
