(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.VueGlobal = factory());
})(this, (function () { 'use strict';

  function reactiveFn() {
    alert('reactive');
  }

  let reactive = reactiveFn;

  // 导出方法，不实现功能

  var index = {
    reactive
  };

  return index;

}));
