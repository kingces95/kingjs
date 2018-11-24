'use strict';

var Node = require('../node');
var defineSchema = require('../define-schema');
var schema = require('./schema');

function create() {
  var loader = new schema.Loader();

  loader.addChildren({
    packages: { 
      'intrinsic': {
        classes: {
          Object: {
            func: Object,
            base: null,
          }
        }
      }
    }
  });

  return loader;
}

Object.defineProperties(module, {
  exports: { value: create }
});