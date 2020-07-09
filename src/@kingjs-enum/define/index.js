var { assert,
  '@kingjs': {
    '-enum': { Enum },
    '-reflect': { defineClass },
    '-string': { IsCapitalized },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Defines an enum.
 * @param name The enum name.
 * @param members An array of member names.
 * 
 * @remarks Enum member names must be capitalized.
 */
function define(name, members) {

  // define the new enum
  var type = defineClass(name, Enum)

  var i = 0
  for (var member of members) {
    assert.ok(member[IsCapitalized]())
    type[member] = new type(i++, member)
  }

  return type
}

module.exports = define