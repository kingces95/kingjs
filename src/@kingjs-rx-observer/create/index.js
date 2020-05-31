var { assert,
  '@kingjs': {
    IObserver: { Next, Complete, Error },
  }
} = module[require('@kingjs-module/dependencies')]()

var EmptyObject = { }
var Noop = () => undefined

/**
 * @description Create an observer using provided functions or defaults
 * @param observer A pojo of observer functions or `next`, `complete`, or
 * `error` functions.
 * @returns Returns an `IObserver`.
 */
function create(observer = EmptyObject) {

  // overload
  if (observer instanceof Function) {
    observer = {
      [Next]: arguments[0],
      [Complete]: arguments[1],
      [Error]: arguments[2],
    } 
  }

  // defaults
  if (!observer[Next])
    observer[Next] = Noop
  if (!observer[Complete])
    observer[Complete] = Noop
  if (!observer[Error])
    observer[Error] = Noop

  // checks
  assert.ok(observer[Next] instanceof Function)
  assert.ok(observer[Complete] instanceof Function)
  assert.ok(observer[Error] instanceof Function)

  return observer
}

module.exports = create
