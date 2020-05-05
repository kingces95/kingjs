var assert = require('assert');
var Capitalize = require('@kingjs-string/capitalize');

assert('foo'[Capitalize]() == 'Foo');