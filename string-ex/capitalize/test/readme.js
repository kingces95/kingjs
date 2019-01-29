var assert = require('assert');
var Capitalize = require('..');

assert('foo'[Capitalize]() == 'Foo');