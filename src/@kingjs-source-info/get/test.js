var assert = require('assert')
var GetInfo = require('..')
var parse = require('@kingjs/source.parse')
var { FunctionDeclaration } = require('@kingjs/source.types')

parse('./.test/source.js').then(ast => {
  for (var node of ast) {
    if (node instanceof FunctionDeclaration)
      break;
  }

  var functionInfo = node[GetInfo]();
})