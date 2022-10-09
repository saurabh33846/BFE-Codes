
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
  let tasks = [];

  setTimeout(async ()=>{
    for(const task of tasks) {
      let result = await task();
      logFn(result);
    }
  }, 0)

  let op = {
    eat:function (dish){
      tasks.push(eatTask(dish));
      return this;
    },
    sleep:function (time){
      tasks.push(sleepTask(time))
      return this;
    },
    sleepFirst: function(time){
        
      tasks.unshift(sleepTask(time));
      return this;
    }

  }
  function eatTask(dish) {
    return ()=> Promise.resolve(`Eat ${dish}`)
  }
  function sleepTask(time) {
    return ()=>{
    return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        resolve(`Wake up after ${time}`)
      }, time)
    }) 
  }
  }
  return op;
}

LazyMan('Jack', console.log).eat('banana').sleep(2000).eat('apple').sleep(3000).eat('Saurabh').sleepFirst(1000);
