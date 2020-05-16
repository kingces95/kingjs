var { assert,
  '@kingjs': {
    '-linq': { Distinct, SequenceEqual, ToArray },
    '-array': { ImplementIEnumerable: ShimArray },
    '-string': { ImplementIEnumerable: ShimString },
  }
} = module[require('@kingjs-module/dependencies')]()

Array[ShimArray]()
String[ShimString]()

function readme() {
  var enumerable = [0, 0, 1, 1, 2, 2]
  enumerable = enumerable[Distinct]()
  assert(enumerable[SequenceEqual]([0, 1, 2]))
}
readme()

function readmeId() {
  var idAndName = [
    { id: 0, name: 'foo' },
    { id: 0, name: 'bar' },
  ]

  var distinctIdAndName =
    idAndName[Distinct](x => x.id)
    [ToArray]()

  assert.deepEqual(distinctIdAndName, [{ id: 0, name: 'foo' }])
}
readmeId()

function dictionaryTest() {
  var enumerable = 'toString'
  enumerable = enumerable[Distinct]()
  enumerable = enumerable[ToArray]()
  assert(enumerable[SequenceEqual]('toSring'))
}
dictionaryTest()