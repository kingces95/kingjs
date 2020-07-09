var { assert,
  '@kingjs': {
    '-reflect': { defineClass },
    '-array': { GroupBy, Distinct },
    '-pojo': { ToPairs },
    '-interface': { Interface, Entries },
    '-string': { Capitalize, IsCapitalized }
  }
} = module[require('@kingjs-module/dependencies')]()

var EmptyArray = []
var EmptyObject = []

/**
 * @description Defines a new interface that can extend existing interfaces
 * and/or define members. 
 * 
 * @param name The interface name. 
 * @param descriptor A pojo with template { members, bases } where
 * member is a pojo of name/symbol interface members, bases is an array of interfaces.
 * 
 * @remarks The interface name should start with `I`.
 * @remarks The interface member names should not be capitalized.
 * @remarks The returned interface has capitalized member names so
 * their constants can be easily deconstructed into capitalized variables.
 * 
 */
function define(name, descriptor) {
  var { 
    members = EmptyObject, 
    bases = EmptyArray
  } = descriptor

  // define the new interface
  var iface = defineClass(name, Interface)

  var d = bases.map(o => o[Entries](o)).flat()

  // key to symbols or arrays of symbols
  var entries = [
    ...members[ToPairs]().map(o => ({ 
        member: o.key, 
        symbol: [ o.value ]
      })
    ),
    ...bases.map(o => o[Entries](o)).flat()
  ]

  // key to array of symbols or arrays of symbols
  var groups = entries[GroupBy](o => o.member, o => o.symbol)

  for (var keyGroup of groups) {
    var { key, group } = keyGroup

    var symbols = group.flat()[Distinct]()

    // unwrap single element arrays
    if (symbols.length == 1)
      symbols = symbols[0]

    // assign member a symbol!
    assert(!key[IsCapitalized]())
    iface[key[Capitalize]()] = symbols
  }

  return iface
}

module.exports = define