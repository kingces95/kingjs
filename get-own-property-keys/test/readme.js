var assert = require('assert');
var getOwnPropertyKeys = require('..');

var symbol = Symbol();
var name = 'name';

var keys = getOwnPropertyKeys.call({ 
  [symbol]: null,
  [name]: null
});

assert.deepEqual(keys, [name, symbol]);