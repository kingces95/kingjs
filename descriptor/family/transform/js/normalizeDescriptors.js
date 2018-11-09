var is = require('@kingjs/is');

var mapNames = require('@kingjs/descriptor.map-names');
var write = require('@kingjs/descriptor.write');

var nestedArray = {
  forEach: require('@kingjs/descriptor.nested.array.for-each'),
}

var normalizeAction = require('./normalizeAction');

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

function normalizeDescriptors(encodedFamily, action, result, actions) {

  // flatten
  if (is.array(encodedFamily)) {
    nestedArray.forEach(encodedFamily, 
      o => normalizeDescriptors(o, action, result, actions));
    return;
  }

  // merge family actions
  var familyAction = mapNames.call(encodedFamily, familyActionMap);
  if (familyAction)
    action = normalizeAction([familyAction, action]);

  // accumulate decoded family members
  for (var encodedName in encodedFamily) {

    // filter out family specific action metadata
    if (encodedName[0] == '$')
      continue;

    // decode name
    var name = encodedName;
    if (encodedName.indexOf('$') != -1) {
      action = write.call(action, 'baseNames', 
        encodedName.split('$')
      );

      name = action.baseNames.shift();
    }

    // accumulate
    result[name] = encodedFamily[encodedName];
    actions[name] = action;
  }
}

Object.defineProperties(module, {
  exports: { value: normalizeDescriptors }
});