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
 * @remarks -- Remarks comment on indented new line.
 * 
 * @callback
 * @param pop Default callback.
 * @returns callback return comment.
 * 
 * @callback foo
 * @param moo Moo comment.
 * @param [boo] Boo comment
 */
function example(callback, foo, bar, baz) { }

var {
  ['@kingjs']: { 
    stringEx: { JoinLines },
    parseSource
  }
} = require('./dependencies');

var {
  JSDocComment,
  FunctionDeclaration
} = parseSource;

var NewLine = '\n';
var Callback = 'callback';

function parse(path) {
  var result = { 
    api: null,
    parameters: { },
    callbacks: { },
    returns: null,
    remarks: [],
    see: [],
  };

  var ast = parseSource(path, { debug: 0 });
  
  // find first JSDocComment
  for (var node of ast) {
    if (node instanceof JSDocComment) {
      for (var tag of node.tags)
        walkDocs(tag);
      break;
    }
    var parent = node;
  }

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

  if (parent instanceof FunctionDeclaration)
    result.api = createApi(result.parameters, parent.name);
    
  return result;

  function walkDocs(node) {

    switch (node.tagName) {
            
      case 'callback':
        var name = getName(node, Callback);
        
        var callback = result.callbacks[name] = { };
        if (node.typeExpression.type)
          callback.returns = node.typeExpression.type.comment;

        var parameters = callback.parameters = { };
        for (var parameter of node.typeExpression.parameters) 
          defineParameter(parameters, parameter);
        break;

      case 'param':
        defineParameter(result.parameters, node);
        break;

      case 'this':
        result.parameters.this = joinComment(node.comment);
        break;

      case 'return':
      case 'returns':
        result.returns = joinComment(node.comment);
        break;

      case 'remarks':
        var comment = node.comment;
        comment = comment.replace(/^(?!---$)[-]+/, 
          // special sauce; e.g. '-- foo' -> ' - foo'
          o => '-'.padStart(o.length * 2, ' ')
        )
        comment = joinComment(comment);

        result.remarks.push(comment);
        break;

      case 'see':
        result.see.push(node.comment);
        break;

      default:
        console.log(node.tagName);
    }
  }
}

function joinComment(comment) {
  return new String(comment[JoinLines]());
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
    return node.fullName;

  // hack fullName support to enable documenting descriptor properties
  // e.g. `descriptor.callback`
  return node.name;
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
      createApi(parameter.callback.parameters, name) : name);
    pushTokens(++i);

    if (isOptional)
      tokens.push(']')
    return tokens;
  }
}

module.exports = parse;

//console.log(JSON.stringify(parse('first-jsdoc.js'), null, 2));
