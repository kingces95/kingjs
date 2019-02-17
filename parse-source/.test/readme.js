var assert = require('assert');
var parseSource = require('..');

var ast = parseSource(__filename, { 
  type: true, 
  lines: true,
  character: true
});

var { 
  SourceFile,
  VariableStatement,
  VariableDeclaration,
  CallExpression
} = parseSource;

assert(ast instanceof SourceFile);

var statement = ast.statements[0];
assert(statement instanceof VariableStatement);

var declaration = statement.declarationList[0];
assert(declaration instanceof VariableDeclaration);
assert(declaration.name == 'assert');

var callExpression = declaration.initializer;
assert(callExpression instanceof CallExpression);
assert(callExpression.expression == 'require');
assert(callExpression.arguments[0] == 'assert');

var json = JSON.stringify(ast, null, 2);
console.log(json);