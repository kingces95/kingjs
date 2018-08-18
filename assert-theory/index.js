var fromEach = require('@kingjs/enumerable.from-each');
var forEach = require('@kingjs/enumerable.for-each');

function assertTheory(theory, observations) {
  forEach(theory, fromEach(observations));
}

Object.defineProperties(module, {
  exports: { value: assertTheory }
});