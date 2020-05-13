var { assert,
  '@kingjs-package-name': { parse },
} = module[require('@kingjs-module/dependencies')]()

var apart = parse('@kingjs-baz/foo-bar')
assert(apart.scope == 'kingjs-baz')
assert(apart.fullName == 'foo-bar')

assert(apart.parts.length == 2)
assert(apart.parts[0] == 'foo')
assert(apart.parts[1] == 'bar')

var apart = parse('foo-bar')
assert(!apart.scope)
assert(apart.fullName == 'foo-bar')

var apart = parse('Bad-Name')
assert(apart === undefined)