var { assert,
  '@kingjs': {
    IEnumerable,
    IEnumerable: { GetEnumerator },
    IEnumerator: { MoveNext, Current },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

function enumerateAndAssert() {
  var enumerator = this[GetEnumerator]()
  for (var i = 0; i < arguments.length; i++) {
    assert.ok(enumerator[MoveNext]())
    assert.equal(enumerator[Current], arguments[i])
  }

  assert.ok(!enumerator[MoveNext]())
}


module[ExportExtension](IEnumerable, enumerateAndAssert)