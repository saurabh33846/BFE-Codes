

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
  