import { addEvent, debounce } from '../uitls'

let ISBODYWRAP = null;

function ImgLazyLoad (options) {
  this._mergeOptions(options);
  this.initDom();
  this.initEvent();
}

ImgLazyLoad.prototype = {
  _mergeOptions (options) {
    const DEFAULT = {
      el: null,
      direction: 'vertical',  //level, vertical
      distance: 50,
      interval: 250,
      beforeLoad: function () { },
      finishLoad: function () { },
      errorLoad: function () { }
    }

    Object.assign(this, DEFAULT, options);
  },
  initDom () {
    this.lazyLoadWrap = this.el ? document.querySelector(this.el) : document;
    ISBODYWRAP = this.lazyLoadWrap === document;

    this.scrollWrap = ISBODYWRAP ? document.documentElement : this.lazyLoadWrap;
    this.scrollWrapHeight = this.scrollWrap.clientHeight;
    this.lazyloadList = Array.prototype.slice.call(this.lazyLoadWrap.querySelectorAll('[data-src], [data-src-background]'));

  },
  initEvent () {
    var renderImg = debounce(this.renderImg, this.interval).bind(this);
    addEvent(this.lazyLoadWrap, 'scroll', renderImg, false)
  },
  renderImg (e) {
    for (let i = 0, len = this.lazyloadList.length; i < len; i++) {
      if (this.inView(this.scrollWrap, this.lazyloadList[i])) {
        this.loadImge(this.lazyloadList[i], i)
      }
    }
  },
  loadImge (element, index) {
    if (element.load) return;

    var self = this;
    var src = element.getAttribute('data-src');

    if (src) {

      self.beforeLoad.call(this, element);
      element.load = true;

      var img = new Image();
      img.src = src;

      img.onload = function () {
        element.load = false;
        element.src = src;
        self.lazyloadList.splice(index, 1);
        self.finishLoad.call(this, element);
      }

      img.onerror = function () {
        element.load = false;
        self.errorLoad.call(this, element);
      }
    }



  },
  inView (box, el) {
    var rect = el.getBoundingClientRect();
    // console.log(rect.top, this.scrollWrapHeight)
    return rect.top < this.scrollWrapHeight - this.distance;
  },
  distroryed () {

  }
}

export default ImgLazyLoad;
