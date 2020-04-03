var assert = require('assert')
var GetFirstDocumented = require('..')
var parse = require('@kingjs/source.parse')
var { FunctionDeclaration } = require('@kingjs/source.types')

parse('./source.js').then(ast => {
  var node = ast[GetFirstDocumented]()
  var tag = node.jsDoc[0].tags[0]
  assert(tag.comment == 'this is a description')
})