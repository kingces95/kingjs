var { 
  fs,
  typescript: ts,
  ['@kingjs']: {
    Path,
    fs: { promises: { file: { Read: ReadFile } } },
    module: { ExportExtension },
    reflect: { is },
    source: {
      types,
      SyntaxKind
    }
  }
} = module[require('@kingjs-module/dependencies')]();

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

  ComputedPropertyName: o => o.expression.text,
}

function log(message) {
  //console.log(message)
}

/**
 * @description Expresses a TypeScript AST as an object literal.
 * 
 * @param test Path of the file to parse. 
 * @param options.debug Augment nodes with row/column debug information.
 * 
 * @returns Each node of the Typescript AST is copied but only 
 * those properties that return nodes. Terminal literals are replaced
 * with their deserialized values. 
 */
async function parse(options = EmptyObject) {
  var path = this
  var buffer = await path[ReadFile]()
  var text = buffer.toString()
  var setParentNodes = true; // else `.getText()` fails
  var { languageVersion = ts.ScriptTarget.Latest } = options

  var ast = ts.createSourceFile(
    path.toString(), 
    text,
    languageVersion, 
    setParentNodes
  )

  return map(ast, options);
}

function isNode(value) {
  return is.object(value) && 'kind' in value;
}

function map(node, options, depth = 0) {
  var kind = SyntaxKind[node.kind];
  log('  '.repeat(depth) + kind)

  // deserialize explicit leaf
  if (kind in leafs)
    return leafs[kind](node);

  // deserialize implicit leaf
  var isToken = SyntaxKind.isToken(kind)
  var isLiteral = SyntaxKind.isLiteral(kind)
  var isKeyword = SyntaxKind.isKeyword(kind)
  if (isToken || isLiteral || isKeyword)
     return node.getText();

  // activate typed result!
  var result = new types[kind]();
  result.syntaxKind = kind

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
      result[name] = value.map(o => map(o, options, depth + 1));
      order[value[0].getStart()] = name;

      // unwrap productions that simply wrap lists
      // e.g. DeclarationList > VariableDeclarationList > [ ...nodes ] 
      //        => DeclarationList > [ ...nodes ]
      if (SyntaxKind.isList(kind)) {
        var result = result[name]
        Object.freeze(result)
        return result
      }

      continue;
    }

    // copy sub-trees
    if (isNode(value)) {
      result[name] = map(value, options, depth + 1);
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

module[ExportExtension](Path.Builder, parse)