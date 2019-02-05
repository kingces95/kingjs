'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');
var keys = require('@kingjs/descriptor.object.keys');
var prolog = require('@kingjs/descriptor.object.prolog');
var epilog = require('@kingjs/descriptor.object.epilog');
var write = require('@kingjs/descriptor.object.write');

var poset = {
  forEach: require('@kingjs/poset.for-each'),
}

var nested = {
  update: require('@kingjs/descriptor.nested.update'),
  reduce: require('@kingjs/descriptor.nested.reduce'),
}

var star = '*';

function load(callback, refs, thisArg) {

  // vacuous load
  if (!refs && !callback)
    return this;

  prolog.call(this);
  var result = this;

  var adjacencyList = mapToAdjacencyList(this, refs, thisArg);

  // trivial load
  if (!adjacencyList) {
    for (var name in this) {
      result = write.call(result, name, 
        loadNext(result, name, callback, null, thisArg)
      );
    }
  } 
  
  // poset load
  else {
    poset.forEach.call(
      adjacencyList, 
      name => {
        result = write.call(result, name, 
          loadNext(result, name, callback, refs, thisArg)
        );
      },
      keys.call(this)
    );
  }

  return epilog.call(result);
}

function loadNext(result, name, callback, refs, thisArg) {
  var descriptor = result[name];
  assert(is.object(descriptor));

  if (refs) {
    var paths = getPaths(refs, name, thisArg);

    if (paths) {
      descriptor = nested.update(
        descriptor,
        paths,
        resolveAndSelect,
        result
      )
    }
  }

  if (callback) {
    descriptor = callback.call(thisArg, descriptor, name) || descriptor;
    assert(is.object(descriptor));
  }

  return descriptor;
}

function resolveAndSelect(name, _, selector) {
  if (!is.string(name))
    return name;

  var result = this[name];

  if (selector)
    result = selector(result, name);

  return result;
}

function mapToAdjacencyList(descriptors, refs, thisArg) {
  if (!refs)
    return null;

  var adjacencyList;
  for (var name in descriptors) {

    var paths = getPaths(refs, name, thisArg);
    if (!paths)
      continue;

    var edges = nested.reduce(
      descriptors[name], 
      paths,
      accumulateStrings
    );

    if (!edges)
      continue;

    if (!adjacencyList)
      adjacencyList = { };

    adjacencyList[name] = edges;
  }

  return adjacencyList;
}

function getPaths(refs, name, thisArg) {

  if (is.function(refs))
    return refs.call(thisArg, name);

  if (name in refs)
    return refs[name];

  if (star in refs)
    return refs[star];

  return null;
}

function accumulateStrings(accumulator, value) {
  if (!is.string(value))
    return accumulator;

  if (!accumulator)
    accumulator = [ ];
  
  accumulator.push(value);
  
  return accumulator;
}

Object.defineProperties(module, {
  exports: { value: load }
});