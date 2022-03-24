// This is the class for the node
// you can use this directly as it is bundled with your code

class Node {
    constructor(val) {
      this.value = val
      this.left = null
      this.right = null
    }
  }
  
  /**
   * @param {Node} root
   * @return {string}
   */
  class Queue {
    constructor() {
      this.items = [];
      this.stack1= [];
      this.stack2=[];
    }
    enQueue(item) {
      this.stack1.push(item)
    }
    deQueue() {
      if(!this.isEmpty()){
        if(this.stack2.length === 0) {
           while(this.stack1.length !==0) {
              this.stack2.push(this.stack1.pop());
            }
        }
        return this.stack2.pop();
      }
    }
    isEmpty(){
      return (!this.stack1.length && !this.stack2.length)
    }
  }
  function serialize(root) {
    if(root === null) {
      return null+""
    }
    // your code here
    let op = [];
    let queue = new Queue();
    queue.enQueue(root);
    let i = 0;
    while(!queue.isEmpty()) {
      let cur = queue.deQueue();
      if(cur!== null) {
        let left = cur.left;
        let right = cur.right;
        queue.enQueue(left ? left:null);
        queue.enQueue(right ? right:null)
        op.push(cur.value);
      } else {
        op.push(null)
      }
    }
    return JSON.stringify(op);
  }
  
  function deserialize(str) {
    if(!str) {
      return null;
    }
    let treeObj = JSON.parse(str);
    let root = new Node(treeObj[0]);
  
    let queue = new Queue();
    queue.enQueue(root);
    let nextIndex = 1;
    
    while(!queue.isEmpty()) {
      let curNode = queue.deQueue();
      let left = nextIndex;
      let right = nextIndex+1;
  
      let leftNode = left > treeObj.length || !treeObj[left] ? null: new Node(treeObj[left]);
      let rightNode = right > treeObj.length ||!treeObj[right] ? null: new Node(treeObj[right]);
  
      curNode.left = leftNode;
      curNode.right = rightNode;
  
      if(leftNode) {
        queue.enQueue(leftNode);
      }
      if(rightNode) {
        queue.enQueue(rightNode);
      }
      nextIndex +=2;
    }
    console.log(serialize(root));
    return root;
  }
  
  let x = "[1,2,3,4,null,null,5,6,7,8,null,null,null,null,9]";
  console.log( deserialize(x))
  