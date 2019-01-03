module.requirePackages = require('.');

var assert = require('assert')
var {
  ['@kingjs/is']: is,
  ['@kingjs/assert-theory']: assertTheory,
} = module.requirePackages('./test.json');

assert(is); // ok!
assert(!assertTheory); // missing!