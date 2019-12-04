import { getAttriute } from '../uitls'
/**
 * 图片加载
 * @param {*} el
 * @param {*} before
 * @param {*} succss
 * @param {*} error
 */
export function loadImage (el, before, success, error) {
  if (el.imgLoad) return;

  var src = getElementSrc(el);

  before(el);
  loadImgHandle(el, src.value, success, error)
}

function loadImgHandle (el, src, success, error) {
  var img = new Image();
  img.src = src;

  img.onload = function () {
    success(el);
  }

  img.onerror = function (e) {
    error(el, e);
  }
}

export function getElementSrc (el) {
  var json = {}

  var imgSrc = getAttriute(el, 'data-src'),
    bgSrc = getAttriute(el, 'data-background-src');

  if (imgSrc) {
    json = {
      key: 'data-src',
      value: imgSrc
    }
  } else if (bgSrc) {
    json = {
      key: 'data-background-src',
      value: bgSrc
    }
  }

  return json;
}
/**
 * 是否已经到达可视区
 * @param {*} scrollOffset
 * @param {*} imgElementOffset
 */
export function inView (scrollOffset, imgElementOffset) {
  // console.log(scrollOffset, imgElementOffset)
  var bel = scrollOffset.top >= imgElementOffset.top && scrollOffset.left >= imgElementOffset.left;
  return bel;
}

/**
 * 如果在head引入该js，document.body就会是null,建议在body内引入改js
 */
// const BODYSCROLL = isPc() ? document.documentElement : document.body ? document.body : document.documentElement;
// // alert(document.documentElement)
// // alert('pc: ' + isPc())
// alert('document.body: ' + BODYSCROLL);
// setTimeout(() => {
//   alert('document.body: ' + document.body);
// }, 0)

// alert(BODYSCROLL === document.body)

export function getScrollRect (el) {
  let pos = {}
  if (el === window) {
    // let {
    //   scrollTop,
    //   scrollLeft,
    //   // clientWidth,
    //   // clientHeight
    // } = BODYSCROLL;
    let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    let scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;

    let { innerHeight: clientHeight, innerWidth: clientWidth } = window;

    pos = {
      scrollTop,
      scrollLeft,
      offsetTop: 0,
      offsetLeft: 0,
      clientWidth,
      clientHeight
    }
  } else {
    pos = el;
    // let {
    //   scrollTop,
    //   scrollLeft,
    //   offsetTop,
    //   offsetLeft,
    //   clientWidth,
    //   clientHeight
    // } = el;

    // pos = {

    // }
  }

  return pos;
}
