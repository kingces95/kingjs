var assert = require('assert');
var replaceAll = require('..');

var target = "fooBarFooBar";
var result = replaceAll.call(target, 'Bar', 'Moo');
assert(result == 'fooMooFooMoo');
