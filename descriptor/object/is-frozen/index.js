var assert = require('@kingjs/assert');
var writableSymbol = require('@kingjs/descriptor.object.writable-symbol');

function isFrozen() {
  if (Object.isFrozen(this)) {
    assert(writableSymbol in this == false);
    return true;
  }
    
  if (writableSymbol in this)
    return false;

  return true;
}

Object.defineProperties(module, {
  exports: { value: isFrozen }
});