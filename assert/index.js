'use strict';

function assert(condition, message) {
  if (condition === false || condition === undefined)
    throw message || "An assertion failed.";
}

Object.defineProperties(module, {
  exports: { value: assert }
});
