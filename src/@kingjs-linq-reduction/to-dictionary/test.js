var { assert,
  '@kingjs': {
    '-linq-reduction': { ToDictionary },
    '-array': { ImplementIEnumerable },
  }
} = module[require('@kingjs-module/dependencies')]()

Array[ImplementIEnumerable]()

function readme() {
  var result = [
    { name: 'Alice', age: 18 },
    { name: 'Bob', age: 19 },
    { name: 'Chris', age: 20 },
  ][ToDictionary](
    function(x) { return x.name },
    function(x) { return x.age }
  )

  assert(!('toString' in result))
  assert(Object.keys(result).length == 3)
  assert(result.Alice == 18)
  assert(result.Bob == 19)
  assert(result.Chris == 20)
}
readme()

function defaultValueSelector() {
  var result = [
    { name: 'Alice', age: 18 },
    { name: 'Bob', age: 19 },
    { name: 'Chris', age: 20 },
  ][ToDictionary](
    function(x) { return x.name }
    // test default valueSelector
  )

  assert(!('toString' in result))
  assert(Object.keys(result).length == 3)
  assert(result.Alice.age == 18)
  assert(result.Bob.age == 19)
  assert(result.Chris.age == 20)
}
defaultValueSelector()

assert.throws(function() {
  [0, 0][ToDictionary](
    function(x) { return x }
  )
})
