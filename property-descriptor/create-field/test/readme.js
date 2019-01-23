var assert = require('assert');
var createField = require('..');

var value = 42; 
var { target, name, descriptor } = createField({ }, 'field', value);

Object.defineProperty(target, name, descriptor);
assert(target[name] == value);