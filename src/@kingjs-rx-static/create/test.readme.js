var { assert,
  '@kingjs': {
    IObservable: { Subscribe },
    IObserver: { Next, Complete, Error },
    '-rx-static': { create }
  }
} = module[require('@kingjs-module/dependencies')]()

var Delay = 200
var Count = 10
var Timeout = Delay * Count - (Delay * 3)
//Timeout *= 2

var counter = create(function*(observer) {
  for (var i = 0; i < Count; i++) {
    observer[Next](i)
    yield Delay
  }

  observer[Complete]()
})

var cancel = counter[Subscribe]({
  [Next](x) { console.log(x) },
  [Error](err) { console.error(err) },
  [Complete]() { console.log('done')}
})

setTimeout(() => {
  console.log('timeout')
  cancel()
}, Timeout)