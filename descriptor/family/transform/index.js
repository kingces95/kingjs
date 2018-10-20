var flatten = require('@kingjs/array.nested.to-array');
var takeLeft = require('@kingjs/func.return-arg-0');

var normalize = require('@kingjs/descriptor.normalize');
var merge = require('@kingjs/descriptor.merge');
var mapNames = require('@kingjs/descriptor.map-names');
var inherit = require('@kingjs/descriptor.inherit');
var update = require('@kingjs/descriptor.update');

var nested = {
  update: require('@kingjs/descriptor.nested.update'),
  merge: require('@kingjs/descriptor.nested.merge'),
  reduce: require('@kingjs/descriptor.nested.reduce'),
}

var poset = {
  decode: require('@kingjs/poset.decode'),
  forEach: require('@kingjs/poset.for-each'),
  inherit: require('@kingjs/poset.inherit')
}

function decodeAndInherit() {
  var vertices = { };

  var encodedPoset = this;
  var edges = poset.decode.call(encodedPoset, vertices);
  result = poset.inherit.call(edges, vertices);
  return result;
}

function resolveAndSelect(name, selector) {
  if (typeof name != 'string')
    return name;

  var result = this[name];

  if (selector)
    result = selector(result);

  return result;
}

function returnThis() {
  return this;
}

function normalizeAction() {
  var action = this;

  // normalize action
  if (action === undefined)
    action = { };
    
  else if (action instanceof Function)
    action = { callback: action };

  if (action.bases)
    action.bases = decodeAndInherit.call(action.bases);

  return action;
}

function inflate(name, copyOnWrite) {
  return update.call(this, function(value, key) {

    if (value instanceof Function == false)
      return value;
    
    if (value.name != '$')
      return value;

    return value(name, key);    
  }, copyOnWrite)
}

function replace(name, thunks, copyOnWrite) {
  return update.call(this, function(value, key) {
    var thunk = thunks[key];
    if (!thunk)
      return value;

    return thunk.call(value, name, key);
  }, copyOnWrite);
}

var familyActionMap = {
  $defaults: 'defaults',
  $bases: 'bases',
  $wrap: 'wrap',
  $thunks: 'thunks',
  $depends: 'depends',
  $refs: 'refs'
};

function composeLeft(g, f) {
  return function(x) { return f(g(x)); }
}

var resolveAction = {
  callback: null,
  wrap: takeLeft,
  defaults: takeLeft,
  bases: takeLeft,
  thunks: composeLeft,
  depends: takeLeft,
  refs: takeLeft,
}

// used to optimize away closure allocation by passing context in $ instead
var hide = { enumerable: false };
function setContext(value) {
  this['$'] = value;
  Object.defineProperty(this, '$', hide);
}

function accumulateStrings(accumulator, value) {
  if (typeof value != 'string')
    return accumulator;

  if (!accumulator)
    accumulator = [ ];
  
  accumulator.push(value);
  
  return accumulator;
}

function mapToAdjacencyList(descriptors, actions) {
  var adjacencyList;

  for (var name in descriptors) {
    var edges = nested.reduce(
      descriptors[name], 
      actions[name].depends,
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

function forEachDependent(descriptors, actions, callback) {
  var adjacencyList = mapToAdjacencyList(descriptors, actions); 

  if (!adjacencyList) {
    for (var name in descriptors) 
      callback(name);
    return;
  }

  var roots = Object.keys(descriptors);
  poset.forEach.call(adjacencyList, callback, roots);
}

function wrapInheritDefaults(encodedFamily, result, actions) {

  var action = actions.$;  

  var familyAction = mapNames.call(encodedFamily, familyActionMap);
  if (familyAction) {
    action = nested.merge(
      normalizeAction.call(familyAction),
      action,
      resolveAction,
    );
  }

  // accumulate decoded family members
  for (var encodedName in encodedFamily) {

    // filter out family specific action metadata
    if (encodedName[0] == '$')
      continue;
  
    var encodedDescriptor = encodedFamily[encodedName];
    var descriptor = encodedDescriptor;
  
    // 1. Wrap
    if (action.wrap)
      descriptor = normalize(descriptor, action.wrap);
  
    // encodedName -> baseNames + name
    var baseNames;
    var name = encodedName;
    if (encodedName.indexOf('$') != -1) {
      baseNames = encodedName.split('$');
      name = baseNames.shift();
    }
  
    // 2. Inherit
    if (baseNames) {
      descriptor = inherit.call(
        descriptor, 
        baseNames.map(baseName => action.bases[baseName])
      );
    }
  
    // 3. Merge
    if (action.defaults) {
      descriptor = merge.call(
        descriptor, 
        action.defaults,
        takeLeft
      );
    }
    
    // accumulate
    actions[name] = action;
    result[name] = descriptor;
  }
}

function dependsInflateThunkScorchUpdate(descriptors, name, action) {

  var descriptor = descriptors[name];

  // 4. Depends
  if (action.depends) {
    descriptor = nested.update.call(
      descriptors,
      descriptor,
      action.depends,
      resolveAndSelect
    )
  }

  // 5. Inflate
  descriptor = inflate.call(
    descriptor, 
    name
  );

  // 6. Thunk
  if (action.thunks) {
    descriptor = replace.call(
      descriptor, 
      name,
      action.thunks
    );
  }
  
  // 7. Scorch

  // 8. Update
  if (action.callback)
    descriptor = action.callback(descriptor, name)
  
  descriptors[name] = descriptor;
}

function resolve(descriptors, name, action) {

  var descriptor = descriptors[name];

  // 9. Resolve
  if (action.depends) {
    descriptor = nested.update.call(
      descriptors,
      descriptor,
      action.ref,
      resolveAndSelect
    )
  }
  
  return descriptor;
}

function transform(action) {
  var result = { };
  var actions = { };
  
  setContext.call(actions, normalizeAction.call(action));

  // Pass I: 1-3; Wrap, Inherit, Defaults
  var encodedFamilies = flatten.call(this);
  for (var i = 0; i < encodedFamilies.length; i++)
    wrapInheritDefaults(encodedFamilies[i], result, actions);

  // Pass II: 4-8; Depends, Inflate, Thunks, Scorch, Update
  forEachDependent(result, actions, name =>
    dependsInflateThunkScorchUpdate(
      result, name, actions[name]
    )
  );

  // Pass III: 9; Resolve
  for (var name in result) 
    resolve(result, name, actions[name]);

  return result;
}

Object.defineProperties(module, {
  exports: { value: transform }
});