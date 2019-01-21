var assert = require('assert');
var expand = require('..');

var result = expand.call('foo');
assert(result == 'foo');