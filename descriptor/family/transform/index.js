var takeLeft = require('@kingjs/func.return-arg-0');
var is = require('@kingjs/is');

var normalize = require('@kingjs/descriptor.normalize');
var merge = require('@kingjs/descriptor.merge');
var mapNames = require('@kingjs/descriptor.map-names');
var inherit = require('@kingjs/descriptor.inherit');
var update = require('@kingjs/descriptor.update');

var nestedArray = {
  flatten: require('@kingjs/descriptor.nested.array.to-array'),
  update: require('@kingjs/descriptor.nested.array.update'),
  forEach: require('@kingjs/descriptor.nested.array.for-each'),
  reduce: require('@kingjs/descriptor.nested.array.reduce')
}

var nested = {
  scorch: require('@kingjs/descriptor.nested.scorch'),
  freeze: require('@kingjs/descriptor.nested.freeze'),
  update: require('@kingjs/descriptor.nested.update'),
  merge: require('@kingjs/descriptor.nested.merge'),
  reduce: require('@kingjs/descriptor.nested.reduce'),
}

var poset = {
  decode: require('@kingjs/poset.decode'),
  forEach: require('@kingjs/poset.for-each'),
  inherit: require('@kingjs/poset.inherit')
}

var hiddenPropertyDescriptor = { 
  enumerable: false 
};

var actionMergePaths = nested.freeze({
  callback: null,
  scorch: takeLeft,
  freeze: takeLeft,
  wrap: takeLeft,
  defaults: { '*': takeLeft },
  bases: { '*': takeLeft },
  thunks: { '*': composeLeft },
  depends: { '*': takeLeft },
  refs: { '*': takeLeft },
}, { '*': null });

var familyActionMap = {
  $scorch: 'scorch',
  $freeze: 'freeze',
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

function setHiddenProperty(target, name, value) {
  target[name] = value;
  Object.defineProperty(target, name, hiddenPropertyDescriptor);
}

function normalizeAction(action) {

  if (action === undefined)
    action = { };
    
  else if (action instanceof Function)
    action = { callback: action };

  else if (is.array(action)) {
    action = nestedArray.flatten(action);
    action = nestedArray.update(action, o => normalizeAction(o));
    action = nestedArray.reduce(action, 
      (x, o) => nested.merge(x, o, actionMergePaths)
    );
  }

  return action;
}

function resolveAndSelect(name, selector) {
  if (typeof name != 'string')
    return name;

  var result = this[name];

  if (selector)
    result = selector(result);

  return result;
}

function inflate(name) {
  return update.call(this, function(value, key) {

    if (value instanceof Function == false)
      return value;
    
    if (value.name != '$')
      return value;

    return value(name, key);    
  })
}

function replace(name, thunks) {
  return update.call(this, function(value, key) {
    var thunk = thunks[key];
    if (!thunk)
      return value;

    return thunk(name, value, key);
  });
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

function decodeAndInherit() {
  var vertices = { };

  var encodedPoset = this;
  var edges = poset.decode.call(encodedPoset, vertices);
  result = poset.inherit.call(edges, vertices);
  return result;
}

function wrapInheritDefaults(encodedFamily, result, actions) {

  var action = actions.$;  

  var familyAction = mapNames.call(encodedFamily, familyActionMap);
  if (familyAction)
    action = normalizeAction([familyAction, action]);

  var bases = decodeAndInherit.call(action.bases);

  // accumulate decoded family members
  for (var encodedName in encodedFamily) {

    // filter out family specific action metadata
    if (encodedName[0] == '$')
      continue;
  
    // decode name
    var baseNames;
    var name = encodedName;
    if (encodedName.indexOf('$') != -1) {
      baseNames = encodedName.split('$');
      name = baseNames.shift();
    }

    var descriptor = encodedFamily[encodedName];
      
    // 1. Wrap
    if (action.wrap)
      descriptor = normalize(descriptor, action.wrap);
  
    // 2. Inherit
    if (bases && baseNames) {
      descriptor = inherit.call(
        descriptor, 
        baseNames.map(baseName => bases[baseName])
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
    descriptor = nested.update(
      descriptor,
      action.depends,
      resolveAndSelect,
      descriptors
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
  if (action.scorch) {
    descriptor = nested.scorch(
      descriptor, 
      action.scorch
    );
  }

  // 8. Update
  if (action.callback) {
    descriptor = action.callback(
      name,
      descriptor 
    )
  }
  
  descriptors[name] = descriptor;
}

function resolve(descriptors, name, action) {

  var descriptor = descriptors[name];

  // 9. Resolve
  if (action.refs) {
    descriptor = nested.update(
      descriptor,
      action.refs,
      resolveAndSelect,
      descriptors
    )
  }
  
  // 10. Freeze
  
  return descriptor;
}

function transform(action) {
  
  // normalize action
  action = normalizeAction(action);

  // assign default action
  var actions = { };
  setHiddenProperty(actions, '$', action);

  // Pass I: 1-3; Wrap, Inherit, Defaults
  var result = { };
  if (!is.array(this))
    wrapInheritDefaults(this, result, actions); // optimization
  else
    nestedArray.forEach(this, o => wrapInheritDefaults(o, result, actions));

  // Pass II: 4-8; Depends, Inflate, Thunks, Scorch, Update
  var adjacencyList = mapToAdjacencyList(result, actions); 
  if (adjacencyList) {
    poset.forEach.call(
      adjacencyList, 
      name => dependsInflateThunkScorchUpdate(
        result, name, actions[name]
      ), 
      Object.keys(result)
    );
  } 
  else {
    for (var name in result) {
      dependsInflateThunkScorchUpdate(
        result, name, actions[name]
      )
    }
  }

  // Pass III: 9; Resolve
  for (var name in result) 
    resolve(result, name, actions[name]);

  return result;
}

Object.defineProperties(module, {
  exports: { value: transform }
});