var { assert,
  '@kingjs': {
    EmptyObject,
    IObserver,
    IObserver: { Subscribed, Next, Complete, Error },
    '-rx-observer': { Proxy, construct }
  }
} = module[require('@kingjs-module/dependencies')]()

var DefaultObserver = {
  [Subscribed]() { },
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
