var assert = require('assert');

var {
  ['@kingjs']: { 
    is,
    reflect: { defineProperty }
  }
} = require('./dependencies');

function createProperty(target, x, y) {
  var name, descriptor;

  if (is.stringOrSymbol(x) && is.string(y)) {
    name = x;
    descriptor = { 
      value: y,
      function: true
    }
  }
  else {
    var { name, descriptor } = defineProperty.call(this, null, x, y);
  }

  return { target, name, descriptor };
}

module.exports = createProperty;
