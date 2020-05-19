var { assert,
  '@kingjs': { 
    IObservable: { Subscribe },
    IObserver: { Next, Complete },
    '-rx': { Subject },
  },
} = module[require('@kingjs-module/dependencies')]()

var i = 0
var complete = false

new Subject((self) => {
  self[Next](i++)
  self[Complete]()
})[Subscribe](
  o => assert(o == 0),
  () => complete = true
)

assert(complete)
assert(i == 1)