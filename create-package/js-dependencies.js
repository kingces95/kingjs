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
  var idStack;
  var packages;

  var root = createSourceFile(path);
  var statements = root.statements;
  if (!statements)
    return;

  walk(statements[0])
  return packages;

  function walk(node, prefix) {
    if (!node)
      return;

    prefix = prefix ? prefix + ': ' : '';

    var kind = ts.SyntaxKind[node.kind];
    var tab = ''.padStart(kindStack.length * 2, ' ');
    var log = x => console.log(`${tab}${prefix}${kind} ${x || ''}`);

    kindStack.push(kind);
    switch (node.kind) {
      case ts.SyntaxKind.VariableStatement:
        log();
        ts.forEachChild(node, walk);
        break;

      case ts.SyntaxKind.VariableDeclarationList:
        log();
        for (var declaration of node.declarations)
          walk(declaration);
        break;

      case ts.SyntaxKind.VariableDeclaration:
        log();
        walk(node.initializer, 'initializer');
        idStack = [];
        packages = [];
        walk(node.name, 'root');
        break;

      case ts.SyntaxKind.ObjectBindingPattern:
        log();
        for (var element of node.elements)
          walk(element);
        break;

      case ts.SyntaxKind.BindingElement:
        log();
        if (node.name.kind == ts.SyntaxKind.ObjectBindingPattern) {
          walk(node.propertyName, 'propertyName');
          if (idStack[0] != '@kingjs')
            packages.push(idStack.join('.'));
          else
            walk(node.name, 'name');
        } else {
          if (node.propertyName)
            walk(node.propertyName, 'propertyName');
          else 
            walk(node.name, 'name');
          packages.push(idStack.join('.'));
        } 
        idStack.pop();
        break;

      case ts.SyntaxKind.ComputedPropertyName:
        var id = node.expression.text;
        log(id);
        if (idStack) idStack.push(id);
        break;

      case ts.SyntaxKind.Identifier:
        var id = node.text;
        log(id);
        if (idStack) idStack.push(id);
        break;

      case ts.SyntaxKind.StringLiteral:
        log(node.text);
        break;
        
      case ts.SyntaxKind.CallExpression:
        log();
        walk(node.expression, 'expression');
        for (var argument of node.arguments)
          walk(argument, 'argument');
        break;

      default:
        log('???');
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

console.log(JSON.stringify(parse('.test/sample.js'), null, 2));
