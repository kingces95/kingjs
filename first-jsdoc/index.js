"use strict";
var fs = require("fs");

var { 
  typescript: ts
} = require('./dependencies');

/**
 * @this any This comment.
 * @param foo Foo comment.
 * @param [bar] Bar comment.
 * @param [baz] Baz comment.
 * @returns The return comment.
 * The return comment cont.
 * @remarks An unsupported remarks tag.
 * Some comments after the JSDoc.
 * @callback foo
 * @param cb0 Callback arg0 comment.
 * @param [db1] Callback arg1 comment.
 */
function example(foo, bar, baz) { }

function parse(path) {
  var result = { 
    api: null,
    parameters: { },
    callbacks: { },
    returns: null,
    remarks: null,
  };
  walk(createSourceFile(path));
  return result;

  function walkDocs(node) {

    switch (node.kind) {
            
      // @callback
      case ts.SyntaxKind.JSDocCallbackTag:
        var name = node.name.text || 'callback';
        var callback = result.callbacks[name] = { };
        for (var parameter of node.typeExpression.parameters) 
          defineParameter(callback, parameter);
        break;

      // @param
      case ts.SyntaxKind.JSDocParameterTag:
        defineParameter(result.parameters, node);
        break;

      // @this
      case ts.SyntaxKind.JSDocThisTag:
        result.parameters.this = node.comment;
        break;

      // @return
      case ts.SyntaxKind.JSDocReturnTag:
        result.returns = node.comment;
        break;

      case ts.SyntaxKind.FirstJSDocTagNode:
        var tag = node.tagName.text;
        switch (tag) {

          // @remarks
          case 'remarks':
            result.remarks = node.comment;
            break;
          
          default:
            //console.log(`${ts.SyntaxKind[node.kind]}.${tag}`);
        }
        break;

      default:
        //console.log(ts.SyntaxKind[node.kind]);
    }
  }

  function walk(node) {
    // skip ahead to first jsDoc comment
    if (!node.jsDoc) 
      return ts.forEachChild(node, walk);
    
    // parse jsDoc comment
    for (var jsDoc of node.jsDoc) 
      ts.forEachChild(jsDoc, walkDocs);

    // join callbacks to their parameters
    for (var callback in result.callbacks)
      result.parameters[callback].callback = result.callbacks[callback];
  }
}

function defineParameter(target, node) {
  var { name: { text: name }, comment, isBracketed } = node;
  var parameter = new String(node.comment);
  parameter.isOptional = node.isBracketed;
  target[name] = parameter;
}

function createSourceFile(path) {
  return ts.createSourceFile(
    path, 
    fs.readFileSync(path).toString(), 
    ts.ScriptTarget.ES2015, 
    true
  )
}

module.exports = parse;

//console.log(JSON.stringify(parse('parse.js'), null, 2));
