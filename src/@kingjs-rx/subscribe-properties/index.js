var { 
  '@kingjs': {
    IObservable,
    '-interface': { ExportExtension },
    '-rx': { SubscribeIterator },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Like `Object.defineProperties`, write intermediate 
 * results of iterators observing an `IObservables` to a `target`.
 * 
 * @this any The `IObservable` under observation.
 * 
 * @param {*} observations The target object onto which observations are written.
 * @param {*} descriptor A set of name/value pairs where each value is an iterator 
 * which will be subscribed to the `IObservable` and whose yield results will 
 * written as `name` on `observations`.
 */
function subscribeProperties(observations, descriptor) {
  for (var name in descriptor)
    this[SubscribeIterator](descriptor[name], observations, name)
}

ExportExtension(module, IObservable, subscribeProperties)
