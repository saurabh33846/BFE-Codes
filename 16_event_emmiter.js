
// please complete the implementation
class EventEmitter {
    constructor() {
      this.eventMap = {};
    }
    releaseEvent(eventName, id) {
      let events = this.eventMap[eventName];
      console.log(eventName, id)
      this.eventMap[eventName] = events.filter((subscriber, index)=>{
        return subscriber.id!==id;
      })
    }
    subscribe(eventName, callback) {
      if (!this.eventMap[eventName]) {
        this.eventMap[eventName] = [];
      }
      let curId = Date.now()+Math.ceil(Math.random()*100)+"";
      const release = {
        release:()=>this.releaseEvent(eventName, curId)
  
      }
      let subscriber = {
        cb:callback,
        id:curId
      }
      this.eventMap[eventName].push(subscriber);
      return release;
    }
    
    emit(eventName, ...args) {
      let subscribers = this.eventMap[eventName] || [];
      subscribers.forEach((cb)=>{
        cb.cb.apply(null, args)
      })
    } 
  }
  const emitter = new EventEmitter()
  let callback1 = ()=>console.log('cb1')
  let callback2 = ()=>console.log('cb1')
  const sub1  = emitter.subscribe('event1', callback1)
  const sub2 = emitter.subscribe('event2', callback2)
  console.log(sub1);
  
  // same callback could subscribe 
  // on same event multiple times
  const sub3 = emitter.subscribe('event1', callback1)
  emitter.emit('event1', 1, 2);
  // callback1 will be called twice
  sub1.release()
  //sub3.release()
  // now even if we emit 'event1' again, 
  // callback1 is not called anymore
  emitter.emit('event1', 1, 2);
  
  emitter.emit()
