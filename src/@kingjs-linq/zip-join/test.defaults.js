var { assert,
  '@kingjs': {
    '-linq': { ZipJoin, 
      '-reduction': { ToArray } 
    },
    '-array': { ImplementIEnumerable: ShimArray },
    '-generator': { Generator, ImplementIEnumerable: ShimGenerator },
  }
} = module[require('@kingjs-module/dependencies')]()

Array[ShimArray]()
Generator[ShimGenerator]()

var outer = [
  { value: 1, name: 'a' },
  { value: 2, name: 'b' },
  { value: 3, name: 'd' },
  { value: 4, name: 'e' },
]

var inner = [
  { value: -1, name: 'b' },
  { value: -2, name: 'c' },
  { value: -3, name: 'd' },
]

var zipJoin = outer
  [ZipJoin](
    inner, 
    o => o.name,
    o => o.name
  )
  [ToArray]()

console.log(zipJoin)
assert.deepEqual(zipJoin, [
  { key: 'a', outer: { value: 1, name: 'a' }, inner: null },
  { key: 'b', outer: { value: 2, name: 'b' }, inner: { value: -1, name: 'b' } },
  { key: 'c', outer: null,                    inner: { value: -2, name: 'c' } },
  { key: 'd', outer: { value: 3, name: 'd' }, inner: { value: -3, name: 'd' } },
  { key: 'e', outer: { value: 4, name: 'e' }, inner: null },
])