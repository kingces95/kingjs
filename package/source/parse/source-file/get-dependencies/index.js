var { 
  Path,
  assert,
  ['@kingjs']: { 
    module: { ExportExtension },
    source: { types }
  }
} = require('./dependencies')

var { name, version } = require('./package.json');
var { ObjectBindingPattern, SourceFile } = types

var Require = 'require';
var Dependencies = 'dependencies';

function getDependencies(ast) {

  // deconstruct the AST
  var {
    statements: {
      [0]: {
        declarationList: {
          [0]: {
            initializer: {
              expression,     // require('./../dependencies.js')
              arguments: {
                [0]: argument // './../dependencies.js'
              }
            },
            name: obp
          }
        }
      }
    }
  } = ast;

  // call is 'require'
  if (expression != Require)
    return;

  // argument like './../dependencies.js'
  if (Path.basename(argument) != Dependencies)
    return;

  assert(obp instanceof ObjectBindingPattern)

  return obp;
}

module.exports = defineExtension(
  SourceFile.prototype, name, version, function match() {
    try { 
      return getDependencies(this) 
    } catch(e) { }
  }
);