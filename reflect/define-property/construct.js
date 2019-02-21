var {
  assert,
  ['@kingjs']: { reflect: { is } }
} = require('./dependencies');

function createProperty(target, x, y) {
  var name, descriptor;

  // e.g. function foo() { ... } => 'foo', function foo() { ... }
  if (is.namedFunction(x)) {
    descriptor = { value: x }
    name = x.name;
  }

  // e.g. { get: function foo() { ... } } => 'foo', { get: function foo() { ... } }
  // e.g. { set: function foo() { ... } } => 'foo', { set: function foo() { ... } }
  // e.g. { value: function foo() { ... } } => 'foo', { value: function foo() { ... } }
  else if (is.object(x)) {
    descriptor = { ...x };
    name = (descriptor.get || descriptor.set || descriptor.value).name;
  }

  else {
    assert(is.stringOrSymbol(x))
    name = x;

    // e.g. 'foo', 'bar' => 'foo', { value: 'bar' }
    // e.g. 'foo', true => 'foo', { value: true }
    // e.g. 'foo', 0 => 'foo', { value: 0 }
    // e.g. 'foo', function() { ... } => 'foo', { value: function() { ... } }
    if (!is.object(y))
      descriptor = { value: y };

    // e.g. 'foo', { ... }
    else
      descriptor = { ...y };
  }

  return { target, name, descriptor };
}

module.exports = createProperty;
