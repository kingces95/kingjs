var assert = require('assert');

var {
  ['lodash']: lodash,
  ['@kingjs/is']: is,
  ['@kingjs/camel-case.split']: split,
  ['@kingjs/camel-case.join']: join,
  ['@kingjs/assert-theory']: assertTheory,
} = require('..').call(module);

assert(lodash);         // present in "dependencies"
assert(is);             // present in "dependencies"
assert(split);          // present in "dependencies"
assert(join);           // present in "dependencies"
assert(!assertTheory);  // missing in "dependencies"

