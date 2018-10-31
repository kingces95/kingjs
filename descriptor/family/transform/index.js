var takeLeft = require('@kingjs/func.return-arg-0');
var is = require('@kingjs/is');

var normalize = require('@kingjs/descriptor.normalize');
var merge = require('@kingjs/descriptor.merge');
var mapNames = require('@kingjs/descriptor.map-names');
var inherit = require('@kingjs/descriptor.inherit');
var update = require('@kingjs/descriptor.update');

var nestedArray = {
  flatten: require('@kingjs/array.nested.to-array'),
  forEach: require('@kingjs/array.nested.for-each')
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

function reduceActions(array) {
  array = nestedArray.flatten(array);
  return array.reduce((a, o) => 
    nested.merge(a, o, actionMergePaths)
  );
}

function normalizeAction(action) {

  // normalize action
  if (action === undefined)
    action = { };
    
  else if (action instanceof Function)
    action = { callback: action };

  if (action.bases)
    action.bases = decodeAndInherit.call(action.bases);

  return action;
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

var actionMergePaths = {
  callback: null,
  scorch: takeLeft,
  freeze: takeLeft,
  wrap: takeLeft,
  defaults: { '*': takeLeft },
  bases: { '*': takeLeft },
  thunks: { '*': composeLeft },
  depends: { '*': takeLeft },
  refs: { '*': takeLeft },
}

// used to optimize away closure allocation by passing context in $ instead
var hiddenPropertyDescriptor = { enumerable: false };
function setHiddenProperty(target, name, value) {
  target[name] = value;
  Object.defineProperty(target, name, hiddenPropertyDescriptor);
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

function wrapInheritDefaults(encodedFamily, result, actions) {

  var action = actions.$;  

  var familyAction = mapNames.call(encodedFamily, familyActionMap);
  if (familyAction)
    action = [normalizeAction(familyAction), action];

  action = reduceActions(action);

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
  var result = { };
  var actions = { };
  
  // normalize default action
  if (!is.array(action))
    action = normalizeAction(action); // optimization
  else
    nestedArray.forEach(action, o => normalizeAction(o)); // bug: need forEach -> update so normalizeAction is updated

  // assign default action
  setHiddenProperty(actions, '$', action);

  // Pass I: 1-3; Wrap, Inherit, Defaults
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