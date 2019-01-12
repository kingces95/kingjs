"use strict";
var fs = require("fs");
var ts = require("typescript");

function compile(path) {
  var result = { params: [ ] };
  var node = parse(path);
  walk(node);
  return result;

  function walkDocs(node) {

    switch (node.kind) {
      
      // @param
      case ts.SyntaxKind.JSDocParameterTag:
        var { name: { text: name }, comment } = node;
        result.params.push({ name, comment });
        break;

      // @return
      case ts.SyntaxKind.JSDocReturnTag:
        result.returns = node.comment;
        break;

      case ts.SyntaxKind.FirstJSDocTagNode:
        var tag = node.tagName.text;
        switch (tag) {

          // @summary
          case 'summary':
            result.summary = node.comment;
            break;
        }
        break;
    }
  }

  function walk(node) {
    if (node.jsDoc) {
      for (var jsDoc of node.jsDoc) 
        ts.forEachChild(jsDoc, walkDocs);
    }

    if (!result.code)
      result.code = node.getText();

    ts.forEachChild(node, walk);
  }
}

function parse(path) {
  return ts.createSourceFile(
    path, 
    fs.readFileSync(path).toString(), 
    ts.ScriptTarget.ES2015, 
    true
  )
}

module.exports = compile;
