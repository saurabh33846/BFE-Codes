
/**
 * @param {HTMLElement} el - element to be wrapped
 */
function $(el) {
  // your code here
  const _css = function css(key, value){
    el.style[key] = value
    return {css:_css}
  }
  return {css:_css};
}
