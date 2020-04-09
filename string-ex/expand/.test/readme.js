var assert = require('assert');
var Expand = require('..');

var foo = 'bar';
var result = 'Key "foo" is "${foo}"'[Expand]({ foo });
assert('Key "foo" is "bar"' == result);