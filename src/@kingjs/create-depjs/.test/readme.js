var assert = require('assert');

var { 
  ['@kingjs']: {
    package: { name: { parse } },
    camelCase: { join }
  }
} = require('./dependencies');

assert(parse);
assert(join);