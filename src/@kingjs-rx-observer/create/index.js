var { assert,
  '@kingjs': {
    IObserver,
    IObserver: { Initialize, Next, Complete, Error },
    '-rx-observer': { Proxy, construct }
  }
} = module[require('@kingjs-module/dependencies')]()

var EmptyObject = { }
var DefaultObserver = {
  [Initialize]() { },
  [Next]() { },
  [Complete]() { },
  [Error](e) {
    process.nextTick(() => { throw e })
  },
}

/**
 * @description Create an observer using provided functions or defaults
 * @param observer A pojo of observer functions or `next`, `complete`, or
 * `error` functions.
 * @returns Returns an `IObserver`.
 */
function create(observer = EmptyObject) {

  // overload
  observer = construct(...arguments)

  // defaults
  if (!(observer instanceof IObserver))
    observer = DefaultObserver[Proxy](observer)

  // checks
  assert.ok(observer instanceof IObserver)

  return observer
}

module.exports = create
