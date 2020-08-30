var {
  '@kingjs': {
    EmptyObject,
    IObserver: { Next, Complete, Error, Subscribed },
  }
} = module[require('@kingjs-module/dependencies')]()

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
      [Subscribed]: arguments[3]
    } 
  }

  return observer
}

module.exports = create
