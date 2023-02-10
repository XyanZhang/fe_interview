'use strict';

function reactiveFn() {
  alert('reactive');
}

let reactive = reactiveFn;

// 导出方法，不实现功能

var index = {
  reactive
};

module.exports = index;
