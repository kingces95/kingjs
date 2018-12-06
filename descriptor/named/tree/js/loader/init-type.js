'use strict';

function initType() {
  var fullName = this.fullName;
  var impls = this.implements;
  console.log('ctor: ' + fullName + ', impls: ', impls);
}

Object.defineProperties(module, {
  exports: { value: initType }
});