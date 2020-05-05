var assert = require('assert')
var Map = require('@kingjs-pojo/map')

var input = { foo: 0, bar: 1 }
var result = input[Map]((value, key) => `${key}:${value}`)
assert.deepEqual({ 
  foo: 'foo:0',
  bar: 'bar:1' 
}, result)