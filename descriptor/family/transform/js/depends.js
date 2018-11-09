var is = require('@kingjs/is');

var poset = {
  forEach: require('@kingjs/poset.for-each'),
}

var nested = {
  update: require('@kingjs/descriptor.nested.update'),
  reduce: require('@kingjs/descriptor.nested.reduce'),
}

var resolveAndSelect = require('./resolveAndSelect');

function depends(descriptors, actions) {

  var adjacencyList = mapToAdjacencyList(descriptors, actions);
  if (!adjacencyList) 
    return;

  function resolve(name) {
    var action = actions[name];
    if (!action.depends)
      return;

    // 4. Depends 
    descriptors[name] = nested.update(
      descriptors[name],
      action.depends,
      resolveAndSelect,
      descriptors
    )
  }

  poset.forEach.call(
    adjacencyList, 
    resolve,
    Object.keys(descriptors)
  );
}

function accumulateStrings(accumulator, value) {
  if (!is.string(value))
    return accumulator;

  if (!accumulator)
    accumulator = [ ];
  
  accumulator.push(value);
  
  return accumulator;
}

function mapToAdjacencyList(descriptors, actions) {
  var adjacencyList;

  for (var name in descriptors) {
    var depends = actions[name].depends;
    if (!depends)
      continue;

    var edges = nested.reduce(
      descriptors[name], 
      depends,
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

Object.defineProperties(module, {
  exports: { value: depends }
});