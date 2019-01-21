var assert = require('assert');

var { 
  ['@kingjs']: {
    packageName: { parse },
    camelCase: { join }
  }
} = require('./dependencies');

assert(parse);
assert(join);