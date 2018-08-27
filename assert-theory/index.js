var fromEach = require('@kingjs/enumerable.from-each');
var forEach = require('@kingjs/enumerable.for-each');
var keys = require('@kingjs/descriptor.keys');

function assertTheory(theory, observations) {

  var clone;
  for (var name in observations) {
    var observation = observations[name];
    if (observation instanceof Array)
      continue;

    if (!clone)
      clone = Object.create(observations);

    // wrap primitives in an array
    if (typeof observation != 'object' || observation == null) {
      clone[name] = [ observation ];
      continue;
    }

    // select an object property's values into an array
    clone[name] = keys.call(observation).map(function(key) {
      return observation[key];
    });
  }

  forEach(theory, fromEach(clone || observations));
}

Object.defineProperties(module, {
  exports: { value: assertTheory }
});