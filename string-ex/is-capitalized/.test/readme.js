var assert = require('assert');
var IsCapitalized = require('..');

assert('Foo'[IsCapitalized]() == true);
assert('foo'[IsCapitalized]() == false);