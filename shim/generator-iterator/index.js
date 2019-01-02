'use strict';

var Generator = require('@kingjs/generator');

Object.defineProperty(
  Generator.prototype,
  Symbol.iterator, {
    configurable: true,
    writable: true,
    value: function() { return this(); },
  }
)