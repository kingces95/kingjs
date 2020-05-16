var { assert,
  '@kingjs': {
    '-linq': { Min },
    '-array': { ImplementIEnumerable },
  }
} = module[require('@kingjs-module/dependencies')]()

Array[ImplementIEnumerable]()

function readme() {
  assert([1, 2, 3][Min]() == 1)
}
readme()

function readmePredicate() {
  var compareAge = function(l, r) {
     return l.age < r.age 
  }
  
  var person = [
    { name: 'Alice', age: 18 },
    { name: 'Bob', age: 18 },
    { name: 'Chris', age: 19 },
  ][Min](compareAge)

  assert(person.name == 'Alice')
  assert(person.age == 18)
}
readmePredicate()
