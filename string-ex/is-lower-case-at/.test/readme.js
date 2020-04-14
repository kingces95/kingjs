var assert = require('assert');
var IsLowerCaseAt = require('..');

assert('Foo'[IsLowerCaseAt](0) == false);
assert('Foo'[IsLowerCaseAt](1) == true);