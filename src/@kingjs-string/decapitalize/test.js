var assert = require('assert');
var Decapitalize = require('@kingjs-string/decapitalize');

assert('Foo'[Decapitalize]() == 'foo');