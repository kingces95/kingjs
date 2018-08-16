'use strict';

var emptyObject = require('./index');
var assert = require('@kingjs/assert');

assert(Object.getOwnPropertyNames(emptyObject).length == 0);
assert(Object.getPrototypeOf(emptyObject) == Object.getPrototypeOf({ }));
assert(Object.isFrozen(emptyObject));
