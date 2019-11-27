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
  el.removeEventListener(el, fn, options);
}

// export function getElOffset (el) {
//   return {
//     offsetTop: el.offsetTop || 0,
//     offsetLeft: el.offsetLeft || 0
//   }
// }

export function getAttriute (el, key) {
  return el.getAttribute(key)
}

export function removeAttribute (el, key) {
  el.removeAttribute(key);
}

export function setAttribute (el, key, value) {
  el.setAttribute(key, value)
}


