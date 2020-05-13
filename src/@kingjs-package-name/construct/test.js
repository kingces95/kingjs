var { assert,
  '@kingjs-package-name': { construct },
} = module[require('@kingjs-module/dependencies')]()

var result = construct('kingJs', [['Foo', 'Bar'], ['BaZ']])
assert(result == '@kingjs/foo-bar.baz')

var result = construct('kingJs')
assert(result == '@kingjs')

var result = construct(null, [['Foo', 'Bar'], 'BaZ'])
assert(result == 'foo-bar.baz')

var result = construct(null, [['child', 'process']], '_')
assert(result == 'child_process')