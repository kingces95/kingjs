var { assert,
  '@kingjs': {
    '-interface': { define },
    '-pojo': { Map },
    '-module': { Module, ExportExtension },
    '-package': { Package },
    '-symbol': { For }
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Export an interface whose name is a capitalized
 * camel case join of the parts of the module name, and whose default
 * symbols are registered as 'IModuleName.propertyName, moduleScope'.
 * 
 * @this Module The module exporting the interface.
 * @param descriptor A pojo of the form `{ members, bases }` where `members`
 * is a pojo map from names to symbols, and bases is an array of interfaces.
 * If a property value of `members` is missing, a symbol will be generated 
 * from the package and property name (e.g. 'IFooBar.prop, @acme').
 */
function exportInterface(descriptor) {
  assert(this instanceof Module)
  var { members = { }, bases } = descriptor

  // get package metadata 
  var { camelCaseName: name, scope } = Package.fromPath(this.path)

  // assign default symbols to every interface member
  members = members[Map]((value, member) => {
    if (value)
      return value

    return Symbol[For](name, { scope, member })
  })

  this.exports = define(name, { members, bases })
}

module[ExportExtension](Module, exportInterface)