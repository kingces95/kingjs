var { 
  typescript: ts,
  ['@kingjs']: {
    reflect: { is }
  }
} = require('./dependencies');

var fs = require("fs");

var AddKind = true;

var types = { }
for (var i = 0; i < ts.SyntaxKind.Count; i++) {
  var name = ts.SyntaxKind[i];
  if (name.match(/Token$/))
    continue;
  if (name.match(/Keyword$/))
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

function parse(path) {

  var stack = [];
  var root = createSourceFile(path);
  return walk(root)

  function walk(node) {
    if (!node)
      return;

    var kind = ts.SyntaxKind[node.kind];

    if (kind in leafs) {
      var leaf = leafs[kind];
      if (is.function(leaf))
        return leaf(node);
      return leaf;
    }

    if (kind.match(/Token$/))
      return node.getText();

    if (kind.match(/Keyword$/))
      return node.getText();

    if (kind.match(/Literal$/))
      return node.getText();

    var result = new types[kind]();

    if (AddKind)
      result['.'] = kind;

    for (var name in node) {
      if (name == 'parent')
        continue;

      var value = node[name];

      if (value instanceof Array) {
        if (!value.length)
          continue;

        var first = value[0];
        if (!is.object(first) || 'kind' in first == false)
          continue;
        
        result[name] = value.map(o => walk(o));

        if (kind.match(/List$/)) {
          result = result[name];
          break;
        }

        continue;
      }

      if (is.string(value)) {
        result[name] = value;
        continue;
      }

      if (!is.object(value) || 'kind' in value == false)
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

function createSourceFile(path) {
  var js = fs.readFileSync(path).toString();
  var result = ts.createSourceFile(
    path, 
    js,
    ts.ScriptTarget.ES2015, 
    true
  )
  return result;
}

module.exports = parse;

var ast = parse('.test/js-doc.js');
//console.log(ast);
fs.writeFileSync('./ast.json', JSON.stringify(ast, null, 2))