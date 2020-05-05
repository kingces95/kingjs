var assert = require('assert');
var ReplaceAll = require('@kingjs-string/replace-all');

var result = "fooBarFooBar"[ReplaceAll]('Bar', 'Moo');
assert(result == 'fooMooFooMoo');
