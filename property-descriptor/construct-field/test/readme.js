var assert = require('assert');
var createField = require('..');

function Type() { }
var value = 42; 

// construct/deconstruct a description of a property that acts like a field
var { target, name, descriptor } = createField(Type.prototype, 'field', value);
assert(target == Type.prototype);
assert(name == 'field');
assert(descriptor.value == value);

// define the property
Object.defineProperty(target, name, descriptor);
assert(target[name] == value);