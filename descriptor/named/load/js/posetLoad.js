'use strict';

var is = require('@kingjs/is');
var keys = require('@kingjs/descriptor.object.keys');
var prolog = require('@kingjs/descriptor.object.prolog');
var epilog = require('@kingjs/descriptor.object.epilog');
var Dictionary = require('@kingjs/Dictionary');

var poset = {
  forEach: require('@kingjs/poset.for-each'),
}

var nested = {
  update: require('@kingjs/descriptor.nested.update'),
  reduce: require('@kingjs/descriptor.nested.reduce'),
}

var resolveAndSelect = require('./resolveAndSelect');
var trivialLoad = require('./trivialLoad');

var star = '*';

function posetLoad(callback, refs, thisArg) {
  prolog.call(this);

  var adjacencyList = mapToAdjacencyList(this, refs, thisArg);
  if (!adjacencyList)
    return trivialLoad.call(this, callback, thisArg);

  var result = new Dictionary();

  poset.forEach.call(
    adjacencyList, 
    name => {

      var paths; 
      if (is.function(refs))
        paths = refs.call(thisArg, name);
      else if (name in refs)
        paths = refs[name];
      else if (star in refs)
        paths = refs[star];
  
      if (paths) {
        result[name] = nested.update(
          this[name],
          paths,
          resolveAndSelect,
          result
        )
      }
  
      result[name] = callback.call(thisArg, result[name], name);
    },
    keys.call(this)
  );

  return epilog.call(result);
}

function mapToAdjacencyList(descriptors, refs, thisArg) {
  var adjacencyList;

  for (var name in descriptors) {

    var paths; 
    if (is.function(refs))
      paths = refs.call(thisArg, name);
    else if (name in refs)
      paths = refs[name];
    else if (star in refs)
      paths = refs[star];
    else
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

function accumulateStrings(accumulator, value) {
  if (!is.string(value))
    return accumulator;

  if (!accumulator)
    accumulator = [ ];
  
  accumulator.push(value);
  
  return accumulator;
}

Object.defineProperties(module, {
  exports: { value: posetLoad }
});