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

export function getScrollRect (el) {
  let pos = {}
  if (el === window) {
    let {
      scrollTop,
      scrollLeft,
      clientWidth,
      clientHeight
    } = document.documentElement;

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
