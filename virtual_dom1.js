/**
 * @param {HTMLElement} 
 * @return {object} object literal presentation
 */
class Node {
  constructor(type) {
    this.type = type;
    this.props = {};
  }
}
function virtualize(element) {
  // your code here
  let root = new Node(element.nodeName.toLowerCase());

  let childNodes = element.childNodes || [];

  let nodeProps = element.attributes || [];


  root.props = {};

  for (const prop of nodeProps) {
    let key = prop.name;
    let value = prop.value

    root.props[key] = value;
  }

  if (childNodes.length === 1) {
     if(childNodes[0].nodeName.includes('text')) {
      root.props.children = childNodes[0].textContent;      
     } else {
        root.props.children = virtualize(childNodes[0])
     }
    return root;
  }

  root.props.children = [];

  for (const node of childNodes) {
    if(node.nodeName.includes('text')) {
      root.props.children.push(node.textContent);
    } else {
      root.props.children.push(virtualize(node));
    }
  }
  return root;
}


/**
 * @param {object} valid object literal presentation
 * @return {HTMLElement} 
 */
function render(obj) {
  // your code here
}


const html = document.createElement('div')
html.innerHTML = `<h1> this is </h1><p class="paragraph"> a <button> button </button> from <a href="https://bfe.dev"><b>BFE</b>.dev</a></p>`
console.log(virtualize(html))
// expect(virtualize(html)).toEqual({
//   type: 'div',
//   props: {
//     children: [
//       {
//         type: 'h1',
//         props: {
//           children: ' this is '
//         }
//       },
//       {
//         type: 'p',
//         props: {
//           className: 'paragraph',
//           children: [
//             ' a ',
//             {
//               type: 'button',
//               props: {
//                 children: ' button '
//               }
//             },
//             ' from ',
//             {
//               type: 'a',
//               props: {
//                 href: 'https://bfe.dev',
//                 children: [
//                   {
//                     type: 'b',
//                     props: {
//                       children: 'BFE'
//                     }
//                   },
//                   '.dev'
//                 ]
//               }
//             }
//           ]
//         }
//       }
//     ]
//   }
// })
