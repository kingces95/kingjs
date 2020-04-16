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

  var { statements } = this
  if (!statements)
    return

  var { declarationList } = statements[0]
  if (!declarationList)
    return

  var { name: obp, initializer } = declarationList[0]
  if (!obp || !initializer)
    return

  var { 
    // require('./../dependencies.js')
    expression, 
    arguments: {
      // './../dependencies.js'
      [0]: argument
    }
  } = initializer

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