'use strict';
var assert = require('assert');

var {
  ['@kingjs']: { fromEach },
} = require('./dependencies');

/**
 * @description Calls a theory with every combination of elements from an array set.
 * 
 * @param {*} theory A function that tests a set of observations.
 * @param {*} observations A descriptor whose every property contains 
 * either an array, primitive, or object from which a sequence of 
 * similar descriptors is generated where each property is replaced 
 * with an array element, the primitive, or a property value respectively.
 * @param {*} runId If present, runs only the observation with the given `id`.
 * 
 * @callback theory
 * @param this The `observations`.
 * @param observation The observation generated from `data`.
 * @param id The number identifying `observation`. 
 * 
 * @remarks If an `observation` fails then it can be easily debugged by supplying 
 * `runId`. If `runId` is specified an exception is still thrown after the test 
 * pass to ensure that the `runId` is removed.
 */
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