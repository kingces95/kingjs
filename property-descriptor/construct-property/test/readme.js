var assert = require('assert')
var constructProperty = require('..');

function Type() { };
var prototype = Type.prototype;

// 1. Named Function
// constructProperty(target, namedFunction)
var myFunction = function myFunction() { };
var { target, name, descriptor } = constructProperty(
  prototype, myFunction
);
assert(target == prototype);
assert(name == 'myFunction');
assert(descriptor.value == myFunction);

// 2. Name + Non-Object Value
// constructProperty(target, name, [
//  undef|null|symbol|number|boolean|string|function
// ])
var { target, name, descriptor } = constructProperty(
  prototype, 'nonObject', true
);
assert(target == prototype);
assert(name == 'nonObject');
assert(descriptor.value === true);

// 3. Name + Object Value
// constructProperty(target, name, descriptor)
var { target, name, descriptor } = constructProperty(
  prototype, 'soTrue', { get: true }
);
assert(target == prototype);
assert(name == 'soTrue');
assert(descriptor.get === true);