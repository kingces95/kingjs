var { Path,
  '@kingjs': {
    '-interface': { define },
    '-pojo': { Map },
    '-module': { Module, ExportExtension },
    '-package-name': { parse },
    '-camel-case': { Join },
    '-string': { Decapitalize }
  }
} = module[require('@kingjs-module/dependencies')]()

var PackageJson = 'package.json'

/**
 * @description Export an interface whose name and member symbols
 * are derived from the scope and name of the module.
 * 
 * @this Module The module exporting the interface.
 * 
 * @param name The name of the interface.
 * @param descriptor A pojo mapping names to symbols. If the symbol
 * is null, one will be derived from the package name and property name.
 * 
 * @remarks Generated symbols are globally registered with
 * this format `${fullName}.${key}, ${scope}`.
 */
function exportInterface(descriptor) {
  var { 
    name: package
  } = this.require(Path.join(this.path, PackageJson))
  var { scope, parts } = parse(package)
  var name = parts[Join](true)

  var { members = { }, bases } = descriptor

  members = members[Map]((value, key) => {
    if (value)
      return value

    return Symbol.for(`${name}.${key[Decapitalize]()}, @${scope}`)
  })

  this.exports = define(name, { members, bases })
}

module[ExportExtension](Module, exportInterface)