var { assert,
  '@kingjs': {
    '-linq': { Union, ToArray },
    '-array': { ImplementIEnumerable },
  }
} = module[require('@kingjs-module/dependencies')]()

Array[ImplementIEnumerable]()

function readme() {
  var result = [0, 0, 1, 2]
    [Union]([1, 3, 3])
  
  result = result[ToArray]()

  assert(result.length = 4)
  assert(result[0] == 0)
  assert(result[1] == 1)
  assert(result[2] == 2)
  assert(result[3] == 3)
}
readme()

function readmeWrapped() {
  var result = [{ id: 0 }, { id: 0 }, { id: 1 }, { id: 2 }]
    [Union]([{ id: 1 }, { id: 3 }, { id: 3 }], x => x.id)
  
  result = result[ToArray]()

  assert(result.length = 4)
  assert(result[0].id == 0)
  assert(result[1].id == 1)
  assert(result[2].id == 2)
  assert(result[3].id == 3)
}
readmeWrapped()