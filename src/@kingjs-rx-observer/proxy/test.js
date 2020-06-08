var { assert,
  '@kingjs': {
    IObserver,
    IObserver: { Initialize, Next, Complete, Error },
    '-rx': { 
      '-observer': { Proxy }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

var observer = {
  [Initialize]() { },
  [Next]() { },
  [Complete]() { },
  [Error]() { }
}

var initialized
var next
var complete
var error

var proxy = observer[Proxy]({
  [Initialize](o) { assert.equal(this, observer); initialized = o },
  [Next](o) { assert.equal(this, observer); next = o },
  [Complete]() { assert.equal(this, observer); complete = true },
  [Error](o) { assert.equal(this, observer); error = o }
})

proxy[Initialize](0)
proxy[Next](1)
proxy[Complete]()
proxy[Error](2)

assert.equal(initialized, 0)
assert.equal(next, 1)
assert.equal(complete, true)
assert.equal(error, 2)