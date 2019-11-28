import {
  addEvent,
  debounce,
  removeAttribute,
  removeEvent
} from '../uitls'

import {
  loadImage,
  inView,
  getElementSrc,
  getScrollRect
} from './loadImage';

function ImgLazyLoad (options) {
  this.imgElementMap = {};
  this.id = 0;
  this.scrollHandle = null;

  this._mergeOptions(options);
  this.initDom();
  this.initEvent();
  this.initCallback();
}

ImgLazyLoad.prototype = {
  _mergeOptions (options) {
    const DEFAULT = {
      target: null,
      el: null,
      distance: 50,
      interval: 250,
      beforeLoad: function () { },
      finishLoad: function () { },
      errorLoad: function () { },
    }



    Object.assign(this, DEFAULT, options);
  },
  initDom () {
    this.lazyLoadWrap = this.el ? document.querySelector(this.el) : document;

    this.scrollWrap = this.target === window ? this.target : this.lazyLoadWrap;
    // this.scrollWrapOffset = getElOffset(this.scrollWrap);
    this._getImgElementMap();
  },
  /**
   * 获取图片列表映射表
   */
  _getImgElementMap () {
    this.lazyloadList = this.lazyLoadWrap.querySelectorAll('[data-src], [data-background-src]');
    this.imgElementMap = {};

    for (let i = 0, len = this.lazyloadList.length; i < len; i++) {
      this.id++;

      let imgElement = this.lazyloadList[i];
      imgElement.id = this.id;

      this.imgElementMap[this.id] = imgElement;
    }

  },
  initEvent () {
    this.scrollHandle = debounce(this.renderImg.bind(this), this.interval);
    this.scrollHandle();

    addEvent(this.scrollWrap, 'scroll', this.scrollHandle, false);

  },
  initCallback () {
    this.imgLazyloadBefore = (el) => {
      el.imgLoad = true;
      this.beforeLoad(el);
    }

    this.imgLazyloadSuccess = (el) => {

      // let imgSrc = getAttriute(el, 'data-src'),
      //   bgSrc = getAttriute(el, 'data-background-src');

      let elSrcData = getElementSrc(el);

      if (elSrcData.key === 'data-src') {
        el.src = elSrcData.value;
      } else if (elSrcData.key === 'data-background-src') {
        el.style.backgroundImage = `url(${elSrcData.value})`;
      } else {
        return;
      }

      removeAttribute(el, elSrcData.key)
      delete this.imgElementMap[el.id];

      this.finishLoad(el, elSrcData.value);
    }

    this.imgLazyLoadError = (el, event) => {
      el.imgLoad = false;
      this.errorLoad(el, event)
    }
  },
  renderImg () {

    let {
      scrollTop,
      scrollLeft,
      offsetTop,
      offsetLeft,
      clientWidth,
      clientHeight
    } = getScrollRect(this.scrollWrap);

    let scrollTopLeft = {
      top: scrollTop + offsetTop + this.distance + clientHeight,
      left: scrollLeft + offsetLeft + this.distance + clientWidth
    }

    for (let i in this.imgElementMap) {
      let imgElement = this.imgElementMap[i];
      let imgElementTopLeft = {
        top: imgElement.offsetTop,
        left: imgElement.offsetLeft
      };

      if (inView(scrollTopLeft, imgElementTopLeft)) {
        loadImage(imgElement, this.imgLazyloadBefore, this.imgLazyloadSuccess, this.imgLazyLoadError);
      }
    }
  },
  refresh () {
    this._getImgElementMap();
  },
  distroryed () {
    removeEvent(this.scrollWrap, 'scroll', this.scrollHandle, false);
  }
}

export default ImgLazyLoad;
