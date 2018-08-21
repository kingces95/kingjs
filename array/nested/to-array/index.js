var forEach = require('@kingjs/array.nested.for-each');

function toArray() {
  var result = [ ];
  forEach.call(this, function(x) {
    result.push(x);
  });
  return result;
}

Object.defineProperties(module, {
  exports: { value: toArray }
});