var create = require('..');
var assert = require('assert');
var assertTheory = require('@kingjs/assert-theory');
var is = require('@kingjs/is');

assertTheory(function(test, id) { 

  var thisArg = { };

  var value = test.value;
  if (!test.rawValue) {
    value = { [test.name]: value };
    if (test.freeze)
      Object.freeze(value);
  }

  var action = { };
  if (test.wrap) {
    action.wrap = test.name;

    if (test.wrapProcedural) {
      action.wrap = function(value) {
        assert(this == thisArg);
        return { [test.name]: value };
      };
    }
  }

  if (test.hasDefault)
    action.defaults = { [test.defaultName]: test.defaultValue };

  if (!test.hasDefault && test.wrap && test.rawAction)
    action = action.wrap;

  if (!is.object(value) && !test.wrap && !is.undefined(value)) {
    assert.throws(() => create(value, action));
    return;
  }

  var result = create(value, action, thisArg);

  assert(Object.isFrozen(result));

  var expectDefaultName = test.hasDefault;
  var expectDefaultValue = expectDefaultName ? test.defaultValue : undefined;

  var expectName = !test.rawValue || (test.wrap && !is.undefined(test.value));
  var expectValue = expectName ? test.value : undefined;

  if (test.defaultName == test.name && (expectDefaultName || expectName)) {
    expectDefaultName = expectName = true;

    if (is.undefined(expectValue) && test.hasDefault)
      expectValue = test.defaultValue;
    else
      expectDefaultValue = expectValue;
  } 

  assert(expectDefaultName == test.defaultName in result);
  assert(expectName == test.name in result);
  assert(expectDefaultValue == result[test.defaultName]);
  assert(expectValue == result[test.name]);
}, {
  name: [ 'foo' ],
  value: [ undefined, 0, 1, null ],
  rawAction: [ false, true ],
  wrap: [ true, false ],
  wrapProcedural: [ false, true ],
  rawValue: [ false, true ],
  hasDefault: [ true, false ],
  defaultName: [ 'foo' ],
  defaultValue: [ 0, 1, null, undefined ],
  freeze: [ true, false ]
})
