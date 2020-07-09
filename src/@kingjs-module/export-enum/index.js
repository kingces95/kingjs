var { assert,
  '@kingjs': {
    '-enum': { define },
    '-module': { Module, ExportExtension },
    '-package': { Package },
    '-symbol': { For }
  }
} = module[require('@kingjs-module/dependencies')]()

var EmptyArray = []

/**
 * @description Export an enum whose name is a capitalized
 * camel case join of the parts of the module name, and whose
 * symbols are registered as 'MyPackage.MemberName, moduleScope'.
 * 
 * @this Module The module exporting the enum.
 * @param members An array of enum member names.
 */
function exportEnum(members = EmptyArray) {
  assert(this instanceof Module)

  // get package metadata 
  var { camelCaseName: name } = Package.fromPath(this.path)

  this.exports = define(name, members)
}

module[ExportExtension](Module, exportEnum)