/**
 * MyElement is the type your implementation supports
 *
 * type MyNode = MyElement | string
 */

/**
 * @param { string } type - valid HTML tag name
 * @param { object } [props] - properties.
 * @param { ...MyNode} [children] - elements as rest arguments
 * @return { MyElement }
 */
class MyNode {
  constructor(type, props, children) {
    this.type = type;
    this.props= {}
    this.props = {...props, children:[]}
    if(children.length === 1) {
      this.props.children = children[0]
    } else {
      this.props.children = [...children]
    }
  }
}
function createElement(type, props, ...children) {
  // your code here
  // Types of children 
  /*
  1. MyElement
  2. String
  3. TextNode

  {
    type:'',
    props:{
      key:value,
      children:'1. 1 child -> Obj, String, 2. More than1 Array[]'
      // If children is type string, assing it to children
    }
  }
  */
  return new MyNode(type, props, children);

}


/**
 * @param { MyElement }
 * @returns { HTMLElement } 
 */
function render(myElement) {
  // your code here
  let curNode = document.createElement(myElement.type);
  // Attach props
  for (const key in myElement.props) {
    if(key !== 'children') {
      curNode.setAttribute(key, myElement.props[key]);
    }
  }
  if(!Array.isArray(myElement.props.children)) {
    myElement.props.children = [myElement.props.children];
  }
  for (const child of myElement.props.children) {
    if(typeof child === 'string') {
      const newChild = document.createTextNode(child);
      curNode.appendChild(newChild);
    } else if (child instanceof MyNode) {
      const newChild = render(child);
      curNode.appendChild(newChild);
    }
  }
  return curNode;
}
