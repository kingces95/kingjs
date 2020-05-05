var { assert,
  '@kingjs': {
    '-reflect': { is },
    '-buffer': { Append },
  }
} = module[require('@kingjs-module/dependencies')]()

var a = Buffer.from('a')
assert(a[Append]().toString() == 'a')

var b = Buffer.from('b')
assert(a[Append](b).toString() == 'ab')
assert(a[Append](b, b).toString() == 'abb')

