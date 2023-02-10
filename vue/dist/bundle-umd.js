(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.VueGlobal = factory());
})(this, (function () { 'use strict';

  function reactive() {
    alert('reactive');
  }

  var reactive$1 = {
    reactive
  };

  // 导出方法，不实现功能

  return reactive$1;

}));
