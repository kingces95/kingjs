var clear = require('@kingjs/descriptor.clear');

function scorch(copyOnWrite) {
  var updatedThis = this;

  for (var name in this) {
    if (this[name] === undefined) {
      updatedThis = clear.call(updatedThis, name, copyOnWrite);
      copyOnWrite = copyOnWrite && updatedThis === this;
    }
  }

  return updatedThis;
}

Object.defineProperties(module, {
  exports: { value: scorch }
});