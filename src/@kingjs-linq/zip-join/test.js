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
  { outer: 1, outerName: 'a' },
  { outer: 2, outerName: 'b' },
  { outer: 3, outerName: 'd' },
  { outer: 4, outerName: 'e' },
]

var inner = [
  { inner: -1, innerName: 'b' },
  { inner: -2, innerName: 'c' },
  { inner: -3, innerName: 'd' },
]

var zipJoin = outer
  [ZipJoin](
    inner,
    o => o.outerName,
    o => o.innerName,
    (o, i) => ({ ...o, ...i }),
    (l, r) => l < r
  )
  [ToArray]()

assert.deepEqual(zipJoin, [
  { outer: 1,            outerName: 'a'                 },
  { outer: 2, inner: -1, outerName: 'b', innerName: 'b' },
  {           inner: -2,                 innerName: 'c' },
  { outer: 3, inner: -3, outerName: 'd', innerName: 'd' },
  { outer: 4,            outerName: 'e'                 },
])