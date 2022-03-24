class Queue {
    constructor() {
        this.stack1 = [];
        this.stack2 = [];
    }
    enQueue(item) {
        this.stack1.push(item)
    }
    deQueue() {
        if (this.stack2.length===0) {
            let len = this.stack1.length;
            let i = 0;
            while(i< len) {
                this.stack2.push(this.stack1.pop());
                i++;
            }
        }
        return this.stack2.pop();
    }
    isEmpty() {
        return !this.stack1.length && !this.stack2.length;
    }
}

export default Queue;