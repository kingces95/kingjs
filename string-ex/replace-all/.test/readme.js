var assert = require('assert');
var ReplaceAll = require('..');

var result = "fooBarFooBar"[ReplaceAll]('Bar', 'Moo');
assert(result == 'fooMooFooMoo');
