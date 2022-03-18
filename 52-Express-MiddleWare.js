class Middleware {
  /**
   * @param {MiddlewareFunc} func
   */
  constructor(){
    this.callbacks = [];
    this.curPosition = -1;
  }
  use(func) {
    if(func.length===2) {
      this.callbacks.push({cb:func, isError:false})
    } else if(func.length ===3) {
      this.callbacks.push({cb:func, isError:true})
    }
  }
  nextFunc(error) {
    if(error) {
      let errorCbIndex = this.findNearestErrorCbIndex();
      if(errorCbIndex !== -1 ) {
        let erroCb = this.callbacks[errorCbIndex].cb;
        this.curPosition = errorCbIndex;
        try {
          erroCb(error, this.req, (err)=>this.nextFunc(err))
        }catch(err) {
          this.curPosition++;
          this.nextFunc(err);
        }
        
      }
    } else {
      let nextCb = this.getNextCb();
      
      this.curPosition++;
      if(nextCb) {
        try {
          nextCb.cb(this.req, (err)=>this.nextFunc(err))
        }catch(err) {
          this.nextFunc(err);
        }
      }
    }
  }
  getNextCb() {
    let nextCb = this.callbacks[this.curPosition];
    if(nextCb.isError) {
      this.curPosition++;
      nextCb = this.callbacks[this.curPosition]
    }
    return nextCb;
  }

  findNearestErrorCbIndex() {
    for(let i = this.curPosition; i< this.callbacks.length; i++) {
      if(this.callbacks[i].isError) {
        return i;
      }
    }
    return -1;
  }

  /**
   * @param {Request} req
   */
  start(req) {
    this.req = req;
    this.curPosition = 0;
    this.nextFunc();
  }
}

