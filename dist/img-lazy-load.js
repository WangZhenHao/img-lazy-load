(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.ImgLazyLoad = factory());
}(this, (function () { 'use strict';

  /**
   * 防抖函数
   */
  function debounce(fn, wait) {
    var timer = null;
    return function () {
      var context = this;
      var args = arguments;

      if (timer) {
        clearTimeout(timer);
        timer = null;
      }

      timer = setTimeout(function () {
        fn.apply(context, args);
      }, wait);
    };
  }
  function addEvent(el, type, fn, options) {
    el.addEventListener(type, fn, options);
  }

  var ISBODYWRAP = null;

  function ImgLazyLoad(options) {
    this._mergeOptions(options);

    this.initDom();
    this.initEvent();
  }

  ImgLazyLoad.prototype = {
    _mergeOptions: function _mergeOptions(options) {
      var DEFAULT = {
        el: null,
        direction: 'vertical',
        //level, vertical
        distance: 50,
        interval: 250,
        beforeLoad: function beforeLoad() {},
        finishLoad: function finishLoad() {},
        errorLoad: function errorLoad() {}
      };
      Object.assign(this, DEFAULT, options);
    },
    initDom: function initDom() {
      this.lazyLoadWrap = this.el ? document.querySelector(this.el) : document;
      ISBODYWRAP = this.lazyLoadWrap === document;
      this.scrollWrap = ISBODYWRAP ? document.documentElement : this.lazyLoadWrap;
      this.scrollWrapHeight = this.scrollWrap.clientHeight;
      this.lazyloadList = Array.prototype.slice.call(this.lazyLoadWrap.querySelectorAll('[data-src], [data-src-background]'));
    },
    initEvent: function initEvent() {
      var renderImg = debounce(this.renderImg, this.interval).bind(this);
      addEvent(this.lazyLoadWrap, 'scroll', renderImg, false);
    },
    renderImg: function renderImg(e) {
      for (var i = 0, len = this.lazyloadList.length; i < len; i++) {
        if (this.inView(this.scrollWrap, this.lazyloadList[i])) {
          this.loadImge(this.lazyloadList[i], i);
        }
      }
    },
    loadImge: function loadImge(element, index) {
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
        };

        img.onerror = function () {
          element.load = false;
          self.errorLoad.call(this, element);
        };
      }
    },
    inView: function inView(box, el) {
      var rect = el.getBoundingClientRect(); // console.log(rect.top, this.scrollWrapHeight)

      return rect.top < this.scrollWrapHeight - this.distance;
    },
    distroryed: function distroryed() {}
  };

  return ImgLazyLoad;

})));
