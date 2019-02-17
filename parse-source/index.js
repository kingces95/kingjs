var { 
  typescript: ts,
  ['@kingjs']: {
    reflect: { is }
  }
} = require('./dependencies');

var fs = require("fs");

var EmptyObject = { };
var AnyListRx = /List$/;
var AnyTokenRx = /Token$/;
var AnyLiteralRx = /Literal$/;
var AnyKeywordRx = /Keyword$/;
var Parent = 'parent';

var types = { }
for (var i = 0; i < ts.SyntaxKind.Count; i++) {
  var name = ts.SyntaxKind[i];
  if (name.match(AnyTokenRx))
    continue;
  if (name.match(AnyKeywordRx))
    continue;
  types[name] = new Function(`return function ${name}() { }`)();
}

var leafs = {
  Identifier: o => o.text,
  StringLiteral: o => o.text,
  TemplateHead: o => o.text,
  
  UndefinedKeyword: undefined,
  NullKeyword: null,
  TrueKeyword: true,
  FalseKeyword: false,

  ContinueStatement: 'continue',
  ReturnStatement: 'return',

  FirstBinaryOperator: o => o.getText(),
  FirstAssignment: o => o.getText(),

  ComputedPropertyName: o => o.expression.text,
}

/**
 * @description Expresses a TypeScript AST as an object literal.
 * 
 * @param path Path to file to a file to parse. 
 * @param options Options to add type, and positioning information to AST.
 * @param options.type If true, type information is added to the AST as
 * `.` properties so it'll appear if the AST is serialized to JSON.
 * @param options.line If true, line numbers are added to the AST.
 * @param options.character If true, character position is added to the AST.
 * 
 * @returns Each node of the Typescript AST is stripped down to just
 * those properties that return nodes or are terminal literals. 
 */
function parse(path, options = EmptyObject) {
  var sourceFile = createSourceFile(path, options.languageVersion);
  return walk(sourceFile);

  function walk(node) {
    var kind = ts.SyntaxKind[node.kind];

    // leaf => value OR function
    if (kind in leafs) {
      var leaf = leafs[kind];
      if (is.function(leaf))
        return leaf(node);
      return leaf;
    }

    // leaf => node.getText
    var isToken = kind.match(AnyTokenRx);
    var isLiteral = kind.match(AnyLiteralRx);
    var isKeyword = kind.match(AnyKeywordRx);
    if (isToken || isLiteral || isKeyword)
      return node.getText();

    // activate typed result
    var result = new types[kind]();

    // add type as property so it shows up in JSON
    if (options.type)
      result['.'] = kind;
    if (node.getStart && (options.lines || options.character)) {
      let start = sourceFile.getLineAndCharacterOfPosition(node.getStart());
      let end = sourceFile.getLineAndCharacterOfPosition(node.getEnd());

      if (options.lines)
        result['.line'] = `${start.line + 1}:${end.line + 1}`;

      if (options.character)
        result['.character'] = `${start.character + 1}:${end.character + 1}`;
    }

    for (var name in node) {
      if (name == Parent)
        continue;

      var value = node[name];

      if (value instanceof Array) {
        if (!value.length)
          continue;

        if (!isNode(value[0]))
          continue;
        
        result[name] = value.map(o => walk(o));

        if (kind.match(AnyListRx)) {
          result = result[name];
          break;
        }

        continue;
      }

      if (is.string(value)) {
        result[name] = value;
        continue;
      }

      if (!isNode(value))
        continue;

      result[name] = walk(value)
    }

    if (Object.getOwnPropertyNames(result).length == 0) {
      console.log(kind);
      result['.'] = kind;
    }
        
    return result;
  }
}

function createSourceFile(
  path, 
  languageVersion = ts.ScriptTarget.Latest) {

  var buffer = fs.readFileSync(path);
  var text = buffer.toString();
  var setParentNodes = true; // else `.getText()` fails

  return ts.createSourceFile(
    path, 
    text,
    languageVersion, 
    setParentNodes
  )
}

function isNode(value) {
 return is.object(value) && 'kind' in value;
}

module.exports = parse;
for (var name in types)
  parse[name] = types[name];

return;
fs.writeFileSync('./.ast.json', 
  JSON.stringify(
    parse('.test/sample.js', { 
      type: true, 
      lines: true,
      character: true
    }
  ), null, 2)
)