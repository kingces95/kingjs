'use strict';

var define = require('@kingjs/enumerable.define');

function odometer() {
  var bases = arguments[0];

  if (bases === undefined || typeof bases == 'number')
    bases = arguments;

  var digits = undefined;
 
  return function() {
    if (bases.length == 0)
      return false;

    if (!digits) {
      digits = [];
      for (var i = 0; i < bases.length; i++)
        digits.push(0);

      this.current_ = digits.slice();
      return true;
    }

    for (var i = 0; i < bases.length; i++) {
      digits[i] += 1;
      digits[i] %= bases[i];
      if (digits[i] == 0)
        continue;

      this.current_ = digits.slice();
      return true;
    }

    return false;
  };
}

Object.defineProperties(module, {
  exports: { value: define(odometer) }
});