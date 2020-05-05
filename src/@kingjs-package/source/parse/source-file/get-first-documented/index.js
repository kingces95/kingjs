var { 
  ['@kingjs']: { 
    module: { ExportExtension },
    source: { types }
  }
} = module[require('@kingjs-module/dependencies')]()

var { SourceFile, FunctionDeclaration } = types

function getFirstDocumented() {
  if (this instanceof FunctionDeclaration && this.jsDoc)
    return this      

  for (var child of this) {
    var result = getFirstDocumented.call(child)
    if (result)
      return result
  }
}

module[ExportExtension](SourceFile, getFirstDocumented)