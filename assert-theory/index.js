var fromEach = require('@kingjs/from-each');
var forEach = require('@kingjs/for-each');

function assertTheory(theory, observations) {
  forEach(theory, fromEach(observations));
}

Object.defineProperties(module, {
  exports: { value: assertTheory }
});