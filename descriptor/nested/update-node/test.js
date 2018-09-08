'use strict';

var updateNode = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertTheory = testRequire('@kingjs/assert-theory');

function readMe() {
  var node = {
    apple: { name: 'Apple' },
    orange: { name: 'Orange' },
    tomato: { name: 'Tomato' }
  }

  var fruits = {
    apple: { weight: 2 },
    orange: { weight: 3 },
    banana: { weight: 4 }
  }

  var vegetables = {
    tomato: { weight: 1 }
  }

  var callbacks = [ ];
  var callback = function(value, context, x, y) {
    callbacks.push({ 
      value: value, 
      context: context, 
      x: x, 
      y: y 
    });

    return value;
  }

  var context = 'My Context';

  var result = updateNode.call(node, callback, context, fruits, vegetables);
}
readMe();

