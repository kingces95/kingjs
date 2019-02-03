var assert = require('assert');

var {
  ['@kingjs']: { 
    is,
    reflect: { defineProperty }
  }
} = require('./dependencies');

function createProperty(target, x, y) {
  var name, descriptor;

  if (is.string(x) && is.string(y)) {
    name = x;
    descriptor = { 
      value: y,
      function: true
    }
  }
  else {
    var { name, descriptor } = defineProperty.apply(this, null, x, y);
  }

  return { target, name, descriptor };
}

module.exports = createProperty;
