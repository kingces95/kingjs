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
  var description;
  walk(createSourceFile(path));
  return description;

  function walkDocs(node) {
    switch (node.kind) {
      
      case ts.SyntaxKind.FirstJSDocTagNode:
        var tag = node.tagName.text;
        switch (tag) {

          // @description
          case 'description':
            description = node.comment;
            description = description.replace(/\r/g, Space);
            description = description.replace(/\n/g, Space);
            break;
        }
        break;
    }
  }

  function walk(node) {
    // skip ahead to first jsDoc comment
    if (!node.jsDoc) 
      return ts.forEachChild(node, walk);
    
    // parse jsDoc comment
    for (var jsDoc of node.jsDoc) 
      ts.forEachChild(jsDoc, walkDocs);
  }
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

//console.log(JSON.stringify(parse('jsdoc-description.js'), null, 2));
