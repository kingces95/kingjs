'use strict';

var assert = require(`@kingjs/assert`);

function assertThrows(func, message) {
  var threw = false;
  try {
    func();
  } catch(e) { 
    threw = true;
  }
  assert(threw, message);
}

Object.defineProperties(module, {
  exports: { value: assertThrows }
});
