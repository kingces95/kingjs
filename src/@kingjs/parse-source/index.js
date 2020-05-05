var { 
  typescript: ts,
  ['@kingjs']: {
    reflect: { is }
  }
} = require('./dependencies');

var fs = require("fs");
var types = require('./define-types');
var rx = require('./rx');

var EmptyObject = { };
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
 * @returns Each node of the Typescript AST is copied but only 
 * those properties that return nodes. Terminal literals are replaced
 * with their deserialized values. 
 */
function parseJavascript(path, options = EmptyObject) {

  var buffer = fs.readFileSync(path);
  var text = buffer.toString();
  var setParentNodes = true; // else `.getText()` fails
  var { languageVersion = ts.ScriptTarget.Latest } = options

  var ast = ts.createSourceFile(
    path, 
    text,
    languageVersion, 
    setParentNodes
  )

  return map(ast, options);
}

function isNode(value) {
  return is.object(value) && 'kind' in value;
}

function map(node, options) {
  var kind = ts.SyntaxKind[node.kind];

  // deserialize explicit leaf
  if (kind in leafs)
    return leafs[kind](node);

  // deserialize implicit leaf
  var isToken = kind.match(rx.AnyToken);
  var isLiteral = kind.match(rx.AnyLiteral);
  var isKeyword = kind.match(rx.AnyKeyword);
  if (isToken || isLiteral || isKeyword)
    return node.getText();

  // activate typed result!
  var result = new types[kind]();

  // add properties '.', '.position', '.line', and '.character' to more easily
  // identify the node type and where in the source file the production is found.
  if (options.debug) {
    result['.'] = kind;
  
    if (node.getStart) {
      let start = ast.getLineAndCharacterOfPosition(node.getStart());
      let end = ast.getLineAndCharacterOfPosition(node.getEnd());
      result['.position'] = node.getStart();
      result['.line'] = `${start.line + 1}:${end.line + 1}`;
      result['.character'] = `${start.character + 1}:${end.character + 1}`;
    }
  }

  var order = { };

  // copy the node properties
  for (var name in node) {

    // skip the parent node
    if (name == Parent)
      continue;

    var value = node[name];

    // strings and booleans are copied directly
    if (is.string(value) || is.boolean(value)) {
      result[name] = value;
      continue;
    }

    // copy arrays of nodes
    if (value instanceof Array && isNode(value[0])) {
      result[name] = value.map(o => map(o, options));
      order[value[0].getStart()] = name;

      // unwrap productions that simply wrap lists
      // e.g. DeclarationList > VariableDeclarationList > [ ...nodes ] 
      //        => DeclarationList > [ ...nodes ]
      if (kind.match(rx.AnyList)) {
        var result = result[name]
        Object.freeze(result)
        return result
      }

      continue;
    }

    // copy sub-trees
    if (isNode(value)) {
      result[name] = map(value, options);
      order[value.getStart()] = name;
    }
  }

  // reset properties in document order
  // (javascript enumerates properties in the order they're set)
  var positions = Object.keys(order).map(o => Number(o)).sort();
  for (var position of positions) {
    var name = order[position];
    result[name] = result[name];
  }
      
  Object.freeze(result);
  return result;
}

module.exports = parseJavascript;
for (var name in types)
  parseJavascript[name] = types[name];