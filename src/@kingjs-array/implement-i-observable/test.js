var { assert,
  '@kingjs': { IObservable,
    '-array': { ImplementIObservable }
  }
} = module[require('@kingjs-module/dependencies')]()

Array[ImplementIObservable]()

var next
var complete

[1][IObservable.Subscribe](
  o => next = o, 
  () => complete = true
)

assert(next == 1)
assert(complete)