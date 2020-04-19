/**
 * @description My description.
 */
var assert = require('assert')
var fs = require('fs')
var Parse = require('..')
var types = require('@kingjs/source.types')
var Path = require('@kingjs/path.builder')

var { 
  SourceFile,
  VariableStatement,
  VariableDeclaration,
  CallExpression,
  Node
} = types

async function run() {
  var thisFile = Path.parse(__filename)
  var ast = await thisFile[Parse]()

  assert(ast instanceof SourceFile)
  
  var statement = ast.statements[0]
  assert(statement instanceof VariableStatement)
  
  var declaration = statement.declarationList[0]
  assert(declaration instanceof VariableDeclaration)
  assert(declaration.name == 'assert')
  
  var callExpression = declaration.initializer
  assert(callExpression instanceof CallExpression)
  assert(callExpression.expression == 'require')
  assert(callExpression.arguments[0] == 'assert')
  
  function walk(node) {
    for (var child of node) {
      assert(node instanceof Node)
      walk(child)
    }
  }
  walk(ast)

  fs.writeFileSync('.ast.json', 
    JSON.stringify(ast, null, 2)
  )
}
run()