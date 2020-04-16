var { 
  Path,
  assert,
  ['@kingjs']: { 
    module: { ExportExtension },
    source: { types }
  }
} = require('./dependencies')

var { ObjectBindingPattern, SourceFile } = types

var Require = 'require';
var Dependencies = 'dependencies';

function getDependencies() {

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
  } = this;

  // call is 'require'
  if (expression != Require)
    return;

  // argument like './../dependencies.js'
  if (Path.basename(argument) != Dependencies)
    return;

  assert(obp instanceof ObjectBindingPattern)

  return obp;
}

module[ExportExtension](SourceFile, getDependencies)