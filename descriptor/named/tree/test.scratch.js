'use strict';

function count() {
  return this.length;
}

var countSym = Symbol('count');

var defineFunctionDescriptor = {
  configurable: false,
  enumerable: false,
  writable: false
};

function createExtensionStub(symbol, func, Type) {
  return function stub() {
    if (this instanceof Type == false)
      return undefined;

    this[symbol] = func;

    Object.defineProperty(
      this,
      symbol,
      defineFunctionDescriptor
    )

    return func.apply(this, arguments);
  }
}

Object.prototype[countSym] = createExtensionStub(countSym, count, Array);

var myArray = [ 1, 2, 3 ];
var length = myArray.length;
var count = myArray[countSym]();
var count = myArray[countSym]();

function Array1() { }

Object.defineProperty(
  Array1,
  Symbol.hasInstance, {
    value: function(instance) {
      return true;
    }
  }
)

console.log([] instanceof Array1);