'use strict';

var fromEach = require('@kingjs/enumerable.from-each');
var forEach = require('@kingjs/enumerable.for-each');
var keys = require('@kingjs/descriptor.keys');

function normalizeObservations(observations) {

  var cloned = false;
  for (var name in observations) {
    var observation = observations[name];
    if (observation instanceof Array)
      continue;

    if (!cloned) {
      observations = Object.create(observations);
      cloned = true;
    }

    // wrap primitives in an array
    if (typeof observation != 'object' || observation == null) {
      observations[name] = [ observation ];
      continue;
    }

    // select an object property's values into an array
    observations[name] = keys.call(observation).map(function(key) {
      return observation[key];
    });
  }

  return observations;
}

function assertTheory(theory, observations, runId) {

  if (runId !== undefined) {
    var originalTheory = theory;
    theory = function(observation, id) {
      if (id != runId)
        return;
      originalTheory.apply(this, arguments);
    }
  }

  forEach.call(
    observations, 
    theory, 
    fromEach(
      normalizeObservations(observations)
    )
  );

  if (runId !== undefined)
    throw 'Passed! Remove runId: ' + runId;
}

Object.defineProperties(module, {
  exports: { value: assertTheory }
});