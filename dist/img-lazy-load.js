(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global['img-lazy-load'] = factory());
}(this, (function () { 'use strict';

  var a = function a() {
    console.log(a);
    alert(1);
  };

  a();

  return a;

})));
