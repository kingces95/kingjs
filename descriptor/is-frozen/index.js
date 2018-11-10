var writableTag = Symbol.for('@kingjs/descriptor.writableTag');

function isFrozen() {
  if (Object.isFrozen(this))
    return true;
    
  if (writableTag in this)
    return false;

  return true;
}

Object.defineProperties(module, {
  exports: { value: isFrozen }
});