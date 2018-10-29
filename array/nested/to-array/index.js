var forEach = require('@kingjs/array.nested.for-each');

function toArray(target) {
  var result = [ ];
  forEach(target, function(x) {
    result.push(x);
  });
  return result;
}

Object.defineProperties(module, {
  exports: { value: toArray }
});