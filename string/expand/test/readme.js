var assert = require('assert');
var expand = require('..');

var foo = 'bar';
var result = expand.call('Key "foo" is "${foo}"', { foo });
assert('Key "foo" is "bar"' == result);