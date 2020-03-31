var assert = require('assert')
var FunctionInfo = require('..')
var parse = require('@kingjs/source.ast.parse')
var { FunctionDeclaration } = require('@kingjs/source.ast.types')

parse('./source.js').then(ast => {
  for (var node of ast) {
    if (node instanceof FunctionDeclaration)
      break;
  }

  var functionInfo = new FunctionInfo(node);
})