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
const h = createElement

var x = h(
  'div',
  {},
  h('h1', {}, ' this is '),
  h(
    'p',
    { className: 'paragraph' },
    ' a ',
    h('button', {}, ' button '),
    ' from ',
    h('a', 
      { href: 'https://bfe.dev' }, 
      h('b', {}, 'BFE'),
      '.dev')
  )
);

console.log(JSON.stringify(x));
