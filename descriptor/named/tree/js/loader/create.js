'use strict';

var Node = require('../node');
var defineSchema = require('../define-schema');
var schema = require('./schema');

var primitiveTypes = {
  $defaults: {
    base: null,
    primitive: true,
  },
  Object: Object,
  Number: Number,
  Boolean: Boolean,
  Symbol: Symbol,
  Null: { func: null },
  Undefined: { func: null }
};

var standardTypes = {
  $defaults: {
    base: 'Object'
  },
  String: String,
  Array: Array
}

function create() {
  var loader = new schema.Loader();

  loader.addChildren({
    packages: { 
      'intrinsic': {
        classes: [
          primitiveTypes,
          standardTypes
        ]
      }
    }
  });

  return loader;
}

Object.defineProperties(module, {
  exports: { value: create }
});