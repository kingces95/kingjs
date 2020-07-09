var { assert,
  '@kingjs': {
    IEnumerable,
    IEnumerable: { GetEnumerator },
    IEnumerator: { MoveNext, Current },
    IGroupedEnumerable: { Key },
    '-module': { ExportInterfaceExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var EmptyArray = []
var EmptyObject = {}

function enumerateAndAssert(
  expected = EmptyArray, 
  options = EmptyObject) {

  var { key } = options

  if (key)
    assert.equal(key, this[Key])

  var enumerator = this[GetEnumerator]()
  for (var i = 0; i < expected.length; i++) {
    assert.ok(enumerator[MoveNext]())
    assert.deepEqual(enumerator[Current], expected[i])
  }

  assert.ok(!enumerator[MoveNext]())
}


module[ExportInterfaceExtension](IEnumerable, enumerateAndAssert)