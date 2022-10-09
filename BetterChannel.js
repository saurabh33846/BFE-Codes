
class SomeChannel{
    constructor(){
        return {port1:{}, port2:{}}
    }
}
class BetterChannel {
  constructor() {
    const {port1, port2} = new SomeChannel()
    this.callbackManager = new Map();
    this.port1 = this.getBetterPort(port1);
    this.port2 = this.getBetterPort(port2);
  }

  getBetterPort(port) {
    let _onMessage = port.onmessage;
    let newPort = {...port,  onmessage: ()=>{}};
    let postMsg = port.postMessage;
   
    port.onmessage = (message)=>{
      let cbForMessage = this.getCallbackFormessage(message);
      let originalMessage = this.removeCbIdentifier(message);
      if(typeof newPort.onmessage === 'function')
        newPort.onmessage(originalMessage,cbForMessage)
    }
    newPort.postMessage = (message, cb)=>{
      let msgId = this.getMessageId(message);
      let modifiedMsg = this.addCbIdentifier(message, msgId);
      this.setCallback(msgId, cb)
      this.callbackManager.set(msgId, cb)
      postMsg(modifiedMsg);
    }
    return newPort
   
  }
   getMessageId(){
      let randomNum = "" + Date.now() + Math.floor(Math.random()*1000)
      return randomNum.slice(randomNum.length -10, randomNum.length);
    }
    addCbIdentifier(message, id) {
      return message + id;
    }
    removeCbIdentifier(message) {
      return message.slice(0,message.length-9);
    }
    setCallback(id, cb) {
      this.callbackManager.set(id, cb)
    }
    getCallbackFormessage(message) {
      let id = message.slice(message.length -10, message.length);
      this.callbackManager.get(id)
    }
}


var {port1, port2} = new BetterChannel()

// port2.onmessage = (message, reply) => {
//   if (message === 'ping?') {
//     reply('pong!')
//   }
//   if (message === 'pong?') {
//     reply('ping!') 
//   }
// }

port1.postMessage('ping?', (data) => {
  console.log(data) // 'pong!'
})
