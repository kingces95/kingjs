var assert = require('assert')
var createProperty = require('..');

function Type() { };
var prototype = Type.prototype;

// createProperty(target, namedFunction)
var myFunction = function myFunction() { };
var { target, name, descriptor } = createProperty(
  prototype, myFunction
);
assert(target == prototype);
assert(name == 'myFunction');
assert(descriptor.value == myFunction);

// createProperty(target, name, [
//  undef|null|symbol|number|boolean|string|function
// ])
var { target, name, descriptor } = createProperty(
  prototype, 'nonObject', true
);
assert(target == prototype);
assert(name == 'nonObject');
assert(descriptor.value === true);

// createProperty(target, name, descriptor)
var { target, name, descriptor } = createProperty(
  prototype, 'soTrue', { get: true }
);
assert(target == prototype);
assert(name == 'soTrue');
assert(descriptor.get === true);