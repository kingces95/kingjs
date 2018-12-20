'use strict';

var is = require('@kingjs/is');

function initLambda() {

  if (is.string(this.get))
    this.get = new Function('return ' + this.get);

  if (is.string(this.set))
    this.set = new Function('value', this.set);

  if (is.string(this.value))
    this.value = new Function('return ' + this.value);

  // if (is.string(this.postCondition))
  //   this.postCondition = new Function('value', this.postCondition);

  return this;
}

Object.defineProperties(module, {
  exports: { value: initLambda }
});