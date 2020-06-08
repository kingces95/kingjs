var {
  '@kingjs': {
    IObserver: { Next, Complete, Error, Initialize },
  }
} = module[require('@kingjs-module/dependencies')]()

var EmptyObject = { }

/**
 * @description Construct a partial `IObservable` from arguments.
 * @param observer A pojo of observer functions or `next`, 
 * `complete`, or `error` functions.
 * @returns Returns a partial `IObserver`.
 */
function create(observer = EmptyObject) {

  // overload
  if (observer instanceof Function) {
    observer = {
      [Next]: arguments[0],
      [Complete]: arguments[1],
      [Error]: arguments[2],
      [Initialize]: arguments[3]
    } 
  }

  return observer
}

module.exports = create
