'use strict';

function assert(condition, message) {
  if (!condition)
    throw message || "An assertion failed.";
}

Object.defineProperties(module, {
  exports: { value: assert }
});
