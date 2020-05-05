var { 
  assert,
  ['@kingjs']: { 
    module: { ExportExtension },
    source: { 
      types,
      info: { FunctionInfo }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

var { Node, FunctionDeclaration } = types

function getInfo() {
  if (this instanceof FunctionDeclaration)
    return new FunctionInfo(this)
}

module[ExportExtension](Node, getInfo)