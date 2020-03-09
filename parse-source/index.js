var { 
  typescript: ts,
  ['@kingjs']: {
    reflect: { is }
  }
} = require('./dependencies');

var fs = require("fs");
var types = require('./define-types');

var EmptyObject = { };
var AnyListRx = /List$/;
var AnyTokenRx = /Token$/;
var AnyLiteralRx = /Literal$/;
var AnyKeywordRx = /Keyword$/;

var Parent = 'parent';
var Continue = 'continue';
var Return = 'return';

var leafs = {
  Identifier: o => o.text,
  StringLiteral: o => o.text,
  TemplateHead: o => o.text,
  
  UndefinedKeyword: o => undefined,
  NullKeyword: o => null,
  TrueKeyword: o => true,
  FalseKeyword: o => false,

  ContinueStatement: o => Continue,
  ReturnStatement: o => Return,

  FirstBinaryOperator: o => o.getText(),
  FirstAssignment: o => o.getText(),

  ComputedPropertyName: o => o.expression.text,
}

/**
 * @description Expresses a TypeScript AST as an object literal.
 * 
 * @param path Path to file to a file to parse. 
 * 
 * @returns Each node of the Typescript AST is stripped down to just
 * those properties that return nodes or are terminal literals. 
 */
function parse(path, options = EmptyObject) {
  var sourceFile = createSourceFile(path, options.languageVersion);
  return walk(sourceFile);

  function walk(node) {
    var kind = ts.SyntaxKind[node.kind];

    // explicit leaf
    if (kind in leafs)
      return leafs[kind](node);

    // implicit leaf
    var isToken = kind.match(AnyTokenRx);
    var isLiteral = kind.match(AnyLiteralRx);
    var isKeyword = kind.match(AnyKeywordRx);

    if (isToken || isLiteral || isKeyword)
      return node.getText();

    // activate typed result
    var result = new types[kind]();

    if (options.debug)
      addDebugAnnotations();

    var order = { };
    for (var name in node) {
      if (name == Parent)
        continue;

      var value = node[name];

      if (is.string(value) || is.boolean(value)) {
        result[name] = value;
        continue;
      }

      if (value instanceof Array && isNode(value[0])) {
        result[name] = value.map(o => walk(o));
        order[value[0].getStart()] = name;

        if (kind.match(AnyListRx)) 
          return result[name];

        continue;
      }

      if (!isNode(value))
        continue;

      result[name] = walk(value);
      order[value.getStart()] = name;
    }

    // Enumerate children in document order;
    // Js enumerates properties in the order they're set
    var positions = Object.keys(order).map(o => Number(o)).sort();
    for (var position of positions) {
      var name = order[position];
      result[name] = result[name];
    }
        
    Object.freeze(result);
    return result;

    function addDebugAnnotations() {
      result['.'] = kind;
    
      if (!node.getStart)
        return;
      
      let start = sourceFile.getLineAndCharacterOfPosition(node.getStart());
      let end = sourceFile.getLineAndCharacterOfPosition(node.getEnd());
      result['.position'] = node.getStart();
      result['.line'] = `${start.line + 1}:${end.line + 1}`;
      result['.character'] = `${start.character + 1}:${end.character + 1}`;
    }
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
var ast = parse('.test/sample.js', { debug: 0 });
fs.writeFileSync('.test/.ast.json', 
  JSON.stringify(ast, null, 2)
)