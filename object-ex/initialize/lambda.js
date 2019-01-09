'use strict';

var is = require('@kingjs/is');

function initializeLambda(name) {

  if (is.string(this.get))
    this.get = new Function('return ' + this.get);

  if (is.string(this.set))
    this.set = new Function('value', this.set);

  if (is.string(this.value))
    this.value = new Function('return ' + this.value);

  return this;
}

module.exports = initializeLambda;
