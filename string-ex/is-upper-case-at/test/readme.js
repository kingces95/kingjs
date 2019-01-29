var assert = require('assert');
var IsUpperCaseAt = require('..');

assert('Foo'[IsUpperCaseAt](0) == true);
assert('Foo'[IsUpperCaseAt](1) == false);