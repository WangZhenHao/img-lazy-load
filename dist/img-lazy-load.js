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
  function removeEvent(el, fn, options) {
    el.removeEventListener(el, fn, options);
  } // export function getElOffset (el) {
  //   return {
  //     offsetTop: el.offsetTop || 0,
  //     offsetLeft: el.offsetLeft || 0
  //   }
  // }

  function getAttriute(el, key) {
    return el.getAttribute(key);
  }
  function removeAttribute(el, key) {
    el.removeAttribute(key);
  }

  /**
   * 图片加载
   * @param {*} el
   * @param {*} before
   * @param {*} succss
   * @param {*} error
   */

  function loadImage(el, before, success, error) {
    if (el.imgLoad) return;
    var src = getElementSrc(el);
    before(el);
    loadImgHandle(el, src.value, success, error);
  }

  function loadImgHandle(el, src, success, error) {
    var img = new Image();
    img.src = src;

    img.onload = function () {
      success(el);
    };

    img.onerror = function (e) {
      error(el, e);
    };
  }

  function getElementSrc(el) {
    var json = {};
    var imgSrc = getAttriute(el, 'data-src'),
        bgSrc = getAttriute(el, 'data-background-src');

    if (imgSrc) {
      json = {
        key: 'data-src',
        value: imgSrc
      };
    } else if (bgSrc) {
      json = {
        key: 'data-background-src',
        value: bgSrc
      };
    }

    return json;
  }
  /**
   * 是否已经到达可视区
   * @param {*} scrollOffset
   * @param {*} imgElementOffset
   */

  function inView(scrollOffset, imgElementOffset) {
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

  function getScrollRect(el) {
    var pos = {};

    if (el === window) {
      // let {
      //   scrollTop,
      //   scrollLeft,
      //   // clientWidth,
      //   // clientHeight
      // } = BODYSCROLL;
      var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
      var _window = window,
          clientHeight = _window.innerHeight,
          clientWidth = _window.innerWidth;
      pos = {
        scrollTop: scrollTop,
        scrollLeft: scrollLeft,
        offsetTop: 0,
        offsetLeft: 0,
        clientWidth: clientWidth,
        clientHeight: clientHeight
      };
    } else {
      pos = el; // let {
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

  function ImgLazyLoad(options) {
    this.imgElementMap = {};
    this.id = 0;
    this.scrollHandle = null;

    this._mergeOptions(options);

    this.initDom();
    this.initEvent();
    this.initCallback();
  }

  ImgLazyLoad.prototype = {
    _mergeOptions: function _mergeOptions(options) {
      var DEFAULT = {
        target: null,
        el: null,
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
      this.scrollWrap = this.target === window ? this.target : this.lazyLoadWrap; // this.scrollWrapOffset = getElOffset(this.scrollWrap);

      this._getImgElementMap();
    },

    /**
     * 获取图片列表映射表
     */
    _getImgElementMap: function _getImgElementMap() {
      this.lazyloadList = this.lazyLoadWrap.querySelectorAll('[data-src], [data-background-src]');
      this.imgElementMap = {};

      for (var i = 0, len = this.lazyloadList.length; i < len; i++) {
        this.id++;
        var imgElement = this.lazyloadList[i];
        imgElement.id = this.id;
        this.imgElementMap[this.id] = imgElement;
      }
    },
    initEvent: function initEvent() {
      this.scrollHandle = debounce(this.renderImg.bind(this), this.interval);
      this.scrollHandle();
      addEvent(this.scrollWrap, 'scroll', this.scrollHandle, false);
    },
    initCallback: function initCallback() {
      var _this = this;

      this.imgLazyloadBefore = function (el) {
        el.imgLoad = true;

        _this.beforeLoad(el);
      };

      this.imgLazyloadSuccess = function (el) {
        // let imgSrc = getAttriute(el, 'data-src'),
        //   bgSrc = getAttriute(el, 'data-background-src');
        var elSrcData = getElementSrc(el);

        if (elSrcData.key === 'data-src') {
          el.src = elSrcData.value;
        } else if (elSrcData.key === 'data-background-src') {
          el.style.backgroundImage = "url(".concat(elSrcData.value, ")");
        } else {
          return;
        }

        removeAttribute(el, elSrcData.key);
        delete _this.imgElementMap[el.id];

        _this.finishLoad(el, elSrcData.value);
      };

      this.imgLazyLoadError = function (el, event) {
        el.imgLoad = false;

        _this.errorLoad(el, event);
      };
    },
    renderImg: function renderImg() {
      var _getScrollRect = getScrollRect(this.scrollWrap),
          scrollTop = _getScrollRect.scrollTop,
          scrollLeft = _getScrollRect.scrollLeft,
          offsetTop = _getScrollRect.offsetTop,
          offsetLeft = _getScrollRect.offsetLeft,
          clientWidth = _getScrollRect.clientWidth,
          clientHeight = _getScrollRect.clientHeight;

      var scrollTopLeft = {
        top: scrollTop + offsetTop + this.distance + clientHeight,
        left: scrollLeft + offsetLeft + this.distance + clientWidth
      };

      for (var i in this.imgElementMap) {
        var imgElement = this.imgElementMap[i];
        var imgElementTopLeft = {
          top: imgElement.offsetTop,
          left: imgElement.offsetLeft
        };

        if (inView(scrollTopLeft, imgElementTopLeft)) {
          loadImage(imgElement, this.imgLazyloadBefore, this.imgLazyloadSuccess, this.imgLazyLoadError);
        }
      }
    },
    refresh: function refresh() {
      this._getImgElementMap();
    },
    distroryed: function distroryed() {
      removeEvent(this.scrollWrap, 'scroll', this.scrollHandle);
    }
  };

  return ImgLazyLoad;

})));
