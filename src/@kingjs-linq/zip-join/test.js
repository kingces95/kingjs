var {
  '@kingjs': {
    '-linq': { ZipJoin, EnumerateAndAssert,
      '-static': { of }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

of(
  { value: 1, name: 'a' },
  { value: 2, name: 'b' },
  { value: 3, name: 'd' },
  { value: 4, name: 'e' },
)[ZipJoin](
  of(
    { value: -1, name: 'b' },
    { value: -2, name: 'c' },
    { value: -3, name: 'd' },
  ),
  o => o.name,
  o => o.name
)[EnumerateAndAssert]([
  { key: 'a', outer: { value: 1, name: 'a' }, inner: null },
  { key: 'b', outer: { value: 2, name: 'b' }, inner: { value: -1, name: 'b' } },
  { key: 'c', outer: null,                    inner: { value: -2, name: 'c' } },
  { key: 'd', outer: { value: 3, name: 'd' }, inner: { value: -3, name: 'd' } },
  { key: 'e', outer: { value: 4, name: 'e' }, inner: null },
])

of(
  { outer: 1, outerName: 'a' },
  { outer: 2, outerName: 'b' },
  { outer: 3, outerName: 'd' },
  { outer: 4, outerName: 'e' },
)[ZipJoin](
  of(
    { inner: -1, innerName: 'b' },
    { inner: -2, innerName: 'c' },
    { inner: -3, innerName: 'd' },
  ), 
  o => o.outerName,
  o => o.innerName,
  (o, i) => ({ ...o, ...i }),
  (l, r) => l < r
)[EnumerateAndAssert]([
  { outer: 1,            outerName: 'a'                 },
  { outer: 2, inner: -1, outerName: 'b', innerName: 'b' },
  {           inner: -2,                 innerName: 'c' },
  { outer: 3, inner: -3, outerName: 'd', innerName: 'd' },
  { outer: 4,            outerName: 'e'                 },
])