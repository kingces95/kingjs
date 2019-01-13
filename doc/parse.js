"use strict";
var fs = require("fs");
var ts = require("typescript");

/**
 * @this any This comment
 * @param foo Foo comment
 * @param [bar] Bar comment
 * @param [baz] Baz comment
 * @returns Returns comment
 */
function example(foo, bar, baz) { }

function parse(path) {
  var result = { parameters: { } };
  var optional = { };
  walk(createSourceFile(path));
  return result;

  function walkDocs(node) {

    switch (node.kind) {
      
      // @param
      case ts.SyntaxKind.JSDocParameterTag:
        var { name: { text: name }, comment, isBracketed } = node;
        optional[name] = isBracketed;
        result.parameters[name] = comment;
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

          // @summary
          case 'summary':
            result.summary = node.comment;
            break;
        }
        break;

      default:
        console.log(ts.SyntaxKind[node.kind]);
    }
  }

  function walk(node) {
    if (!node.jsDoc) 
      return ts.forEachChild(node, walk);
    
    var signature = result.signature = node.parameters.map(x => x.name.text);

    for (var jsDoc of node.jsDoc) 
      ts.forEachChild(jsDoc, walkDocs);

    var tokens = [];
    pushSignatureTokens(0);
    result.api = `${node.name.text}(${tokens.join('')})`;
    return;

    // example(foo[, bar[, baz]])
    function pushSignatureTokens(i) {
      if (i == signature.length)
        return tokens;

      var name = signature[i];
      var isOptional = optional[name];
      if (isOptional)
        tokens.push('[')

      if (i > 0)
        tokens.push(', ')

      tokens.push(name);
      pushSignatureTokens(++i);

      if (isOptional)
        tokens.push(']')
      return tokens;
    }
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

//console.log(JSON.stringify(parse('doc/compile.js'), null, 2));
