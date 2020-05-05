var { 
  assert,
  ['@kingjs']: { 
    module: { ExportExtension },
    source: { 
      types,
      info: { FunctionInfo }
    }
  }
} = require('./dependencies')

var { Node, FunctionDeclaration } = types

function getInfo() {
  if (this instanceof FunctionDeclaration)
    return new FunctionInfo(this)
}

module[ExportExtension](Node, getInfo)