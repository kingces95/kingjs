var assert = require('assert');
var Decapitalize = require('..');

assert('Foo'[Decapitalize]() == 'foo');