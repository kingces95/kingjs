var clear = require('@kingjs/descriptor.clear');

function scorch() {
  var updatedThis = this;

  for (var name in this) {
    if (this[name] !== undefined)
      continue;
      
    updatedThis = clear.call(updatedThis, name);
  }

  return updatedThis;
}

Object.defineProperties(module, {
  exports: { value: scorch }
});