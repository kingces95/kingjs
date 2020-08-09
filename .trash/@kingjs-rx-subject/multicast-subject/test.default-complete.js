var { assert,
  '@kingjs': { 
    IObservable: { Subscribe },
    IObserver: { Next, Complete, Error },
    '-rx': { Subject },
  },
} = module[require('@kingjs-module/dependencies')]()

var disposed = false
var subject = new Subject((self) => {
  self[Complete]()

  return function dispose() {
    disposed = true
  }
})

subject[Subscribe](assert.fail)
assert(!disposed)

async function run() {
  var disposed = false

  await new Promise((resolve) => {
    var subject = new Subject((self) => {
      process.nextTick(() => {
        self[Complete]()
        resolve()
      })

      return function dispose() {
        disposed = true
      }
    })

    // subscribe without a complete handler and 
    // still expect dispose logic to run
    subject[Subscribe](assert.fail)
  })

  assert(disposed)
}
run()