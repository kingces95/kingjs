'use strict';
var assert = require('assert');

var {
  '@kingjs/from-each': fromEach,
} = require('@kingjs/require-packages').call(module);

function assertTheory(theory, observations, runId) {

  var id = 0;
  for (var observation of fromEach(normalize(observations))) {
    if (id !== runId && runId !== undefined) {
      id++;
      continue;
    }

    theory.call(observations, observation, id++);
  }

  assert(runId === undefined, 'Passed! Remove runId: ' + runId);
}

function normalize(observations) {

  observations = Object.create(observations);

  for (var name in observations) {
    var observation = observations[name];

    if (observation instanceof Array)
      continue;

    // wrap primitives in an array
    if (typeof observation !== 'object' || observation === null) {
      observations[name] = [ observation ];
      continue;
    }

    // create an array of the object's values
    var objectValues = [];
    for (var key in observation)
      objectValues.push(observation[key]);
    observations[name] = objectValues;
  }

  return observations;
}

Object.defineProperties(module, {
  exports: { value: assertTheory }
});