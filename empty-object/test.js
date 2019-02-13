'use strict';

var emptyObject = require('.');

var assert = require('assert');

assert(Object.getOwnPropertyNames(emptyObject).length == 0);
assert(Object.getPrototypeOf(emptyObject) == Object.getPrototypeOf({ }));
assert(Object.isFrozen(emptyObject));
