"use strict";
var fs = require("fs");
var ts = require("typescript");

var Space = ' ';

/**
 * @description
 * A jsDoc comment.
 * That spans a
 * few lines.
 * 
 * @param foo Foo comment
 */
function example(foo) { }

function parse(path) {
  var kindStack = [];
  var idStack = [];

  var description;
  ts.forEachChild(createSourceFile(path), walk)
  return description;

  function walk(node) {
    var kind = ts.SyntaxKind[node.kind];
    kindStack.push(kind);
    switch (node.kind) {
      case ts.SyntaxKind.VariableStatement:
        ts.forEachChild(node, walk);
        break;
      case ts.SyntaxKind.VariableDeclarationList:
        for (var declaration of node.declarations)
          ts.forEachChild(declaration, walk);
        break;
      case ts.SyntaxKind.ObjectBindingPattern:
        for (var element of node.elements)
          walk(element);
        console.log(idStack.join('.'));
        idStack.pop();
        break;
      case ts.SyntaxKind.BindingElement:
        ts.forEachChild(node, walk);
        break;
      case ts.SyntaxKind.ComputedPropertyName:
        var id = node.expression.text;
        idStack.push(id);
        console.log(id); // @kingjs
        break;
      case ts.SyntaxKind.Identifier:
        var id = node.text;
        idStack.push(id);
        console.log(id); // git
        break;
    }
    kindStack.pop();
  }
}

function createSourceFile(path) {
  var js = fs.readFileSync(path).toString();
  return ts.createSourceFile(
    path, 
    js,
    ts.ScriptTarget.ES2015, 
    true
  )
}

module.exports = parse;

console.log(JSON.stringify(parse('index.js'), null, 2));
