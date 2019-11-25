/**
 * 防抖函数
 */
export function debounce (fn, wait) {
  var timer = null;
  return function () {
    var context = this
    var args = arguments
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, wait)
  }
}

export function addEvent (el, type, fn, options) {
  el.addEventListener(type, fn, options);
}

export function removeEvent (el, fn, options) {

}
