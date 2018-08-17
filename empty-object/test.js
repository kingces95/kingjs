'use strict';

var emptyObject = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');

assert(Object.getOwnPropertyNames(emptyObject).length == 0);
assert(Object.getPrototypeOf(emptyObject) == Object.getPrototypeOf({ }));
assert(Object.isFrozen(emptyObject));
