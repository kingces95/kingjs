"use strict";
var fs = require("fs");
var ts = require("typescript");

var {
  ['@kingjs']: { 
    string: { joinLines }
  }
} = require('./dependencies');

var NewLine = '\n';
var Callback = 'callback';

/**
 * @this any This comment
 * 
 * @param callback Callback comment.
 * @param foo Foo comment is `42`.
 * @param [bar] Bar comment.
 * @param [baz] Baz comment.
 * 
 * @returns The return comment.
 * Return comment that spans a line.
 * 
 * @remarks Remarks comment
 * that spans lines.
 * @remarks - Remarks comment on new line.
 * @remarks   - Remarks comment on indented new line.
 * 
 * @callback
 * @param pop Default callback.
 * 
 * @callback foo
 * @param moo Moo comment.
 * @param [boo] Boo comment
 */
function example(callback, foo, bar, baz) { }


function parse(path) {
  var result = { 
    api: null,
    parameters: { },
    callbacks: { },
    returns: null,
    remarks: [],
    see: [],
  };
  walk(createSourceFile(path));
  return result;

  function walkDocs(node) {

    switch (node.kind) {
            
      // @callback
      case ts.SyntaxKind.JSDocCallbackTag:
        var name = getName(node, Callback);
        
        var callback = result.callbacks[name] = { };
        if (node.typeExpression.type)
          callback.returns = node.typeExpression.type.comment;

        var parameters = callback.parameters = { };
        for (var parameter of node.typeExpression.parameters) 
          defineParameter(parameters, parameter);
        break;

      // @param
      case ts.SyntaxKind.JSDocParameterTag:
        defineParameter(result.parameters, node);
        break;

      // @this
      case ts.SyntaxKind.JSDocThisTag:
        result.parameters.this = joinComment(node.comment);
        break;

      // @return
      case ts.SyntaxKind.JSDocReturnTag:
        result.returns = joinComment(node.comment);
        break;

      case ts.SyntaxKind.FirstJSDocTagNode:
        var tag = node.tagName.text;
        switch (tag) {

          // @remarks
          case 'remarks':
            var text = node.getText();
            var indent = text.match(/(?:\s)(\s*)$/)[1] || '';
            var remarks = joinComment(indent + node.comment);
            result.remarks.push(remarks);
            break;
 
          // @see
          case 'see':
            result.see.push(node.comment);
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
    for (var name in result.parameters) {
      var parameter = result.parameters[name];
      if (result.callbacks[name])
        parameter.hasCallback = true;

      // default makes template easier to author
      parameter.callback = result.callbacks[name] || { };
    }

    // join remarks
    result.remarks = result.remarks.join(NewLine);

    result.api = createApi(result.parameters, node.name.text);
    return;
  }
}

function joinComment(comment) {
  return new String(joinLines.call(comment));
}

function defineParameter(target, node) {
  var { comment = '', isBracketed } = node;
  var name = getName(node);

  target[name] = joinComment(comment);
  target[name].isOptional = isBracketed;
}

function getName(node, dfault) {
  if (!node.name)
    return dfault;

  if (node.fullName)
    return node.fullName.getText();

  // hack fullName support to enable documenting descriptor properties
  // e.g. `descriptor.callback`
  var name = node.name.getText();
  return name;
}

function createApi(parameters, name) {
  var signature = Object.keys(parameters);

  // exclude descriptor property documentation
  // e.g. descriptor.lazy
  signature = signature.filter(x => x.indexOf('.') == -1);

  var tokens = [];
  return `${name}(${pushTokens(0).join('')})`;

  // example(foo[, bar[, baz]])
  function pushTokens(i) {
    if (i == signature.length)
      return tokens;

    var name = signature[i];
    var parameter = parameters[name];
    var isOptional = parameter.isOptional;
    if (isOptional)
      tokens.push('[')

    if (i > 0)
      tokens.push(', ')

    tokens.push(parameter.hasCallback ? 
      createApi(parameter.callback, name) : name);
    pushTokens(++i);

    if (isOptional)
      tokens.push(']')
    return tokens;
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

//console.log(JSON.stringify(parse('first-jsdoc.js'), null, 2));
