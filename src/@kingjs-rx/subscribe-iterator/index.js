var { 
  '@kingjs': {
    IObservable,
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Pump data into iterator and publish results to observations[name]
 * 
 * @this any An `IObservable` to which the iterator will be subscribed.
 * 
 * @param [observations] An object to which result of each iteration is written. 
 * @param [name] The name of the observation to store the result of each iteration.
 * 
 * @remarks - The iterator is started when the first value is observed.
 * @remarks - The iterator accepts emitted values from yield (see iterable.next(value)) 
 * and can yield intermediate results to be saved in `name` on `observations`.
 * @remarks - A `null` value is emitted to indicate the end of emissions. As such,
 * this abstraction is only suitable if `null` is not a nominal emitted value.
 * 
 * @remarks - Originally designed for streaming zip decompression, the chunks of the
 * downloaded stream would be observed in order to save, inflate, and hash. 
 * Those operation were implemented as an iterators that would accept a buffer of 
 * data and return bytes downloaded and inflated (so progress could be reported)
 * and the ultimate hash value.
 */
function subscribeIterator(observations, name) {
  var iterator = this
  var next

  return this.subscribe({
    next: o => observe(o),
    complete: () => observe(null)
  })

  function observe(o) {
    if (!next)
      next = iterator.next()

    if (next.done)
      return

    next = iterator.next(o)

    if (observations)
      observations[name] = next.value
  }
}

ExportExtension(module, IObservable, subscribeIterator)