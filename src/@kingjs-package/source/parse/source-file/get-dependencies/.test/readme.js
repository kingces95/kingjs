var assert = require('assert')
var GetDependencies = require('..')
var parse = require('@kingjs/source.parse')
var { ObjectBindingPattern } = require('@kingjs/source.types')

parse('./source.js').then(ast => {
  var obp = ast[GetDependencies]();
  assert(obp instanceof ObjectBindingPattern)
})