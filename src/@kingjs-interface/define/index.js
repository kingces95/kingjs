var {
  '@kingjs': {
    '-reflect': { defineClass },
    '-array': { GroupBy, Distinct },
    '-pojo': { ToPairs },
    '-interface': { Interface, Entries },
    '-string': { Capitalize }
  }
} = module[require('@kingjs-module/dependencies')]()

var EmptyArray = []
var EmptyObject = []

/**
 * @description Defines a new interface that can extend exisitng interfaces
 * and/or define members. 
 * 
 * @param name The interface name. By convention, the name should start with `I`.
 * @param descriptor A pojo with template { members, bases } where
 * member is a pojo of name/symbol interface members, bases is an array of interfaces.
 */
function define(name, descriptor) {
  var { 
    members = EmptyObject, 
    bases = EmptyArray
  } = descriptor

  // define the new interface
  var iface = defineClass(name, Interface)

  // key -> arrays of symbols
  var entries = [
    ...members[ToPairs]().map(o => ({ 
        key: o.key, 
        value: [ o.value ]
      })
    ),
    ...bases.map(o => o[Entries](o)).flat()
  ]

  // key -> array of arrays of symbols
  var groups = entries[GroupBy](o => o.key, o => o.value)

  for (var keyGroup of groups) {
    var { key, group } = keyGroup

    // array of array of symbols -> array of symbols
    var symbols = group.flat()[Distinct]()

    // unwrap single element arrays
    if (symbols.length == 1)
      symbols = symbols[0]

    // assign member a symbol!
    iface[key[Capitalize]()] = symbols
  }

  return iface
}

module.exports = define