var { 
  '@kingjs': {
    '-rx': { create,
      '-i-observer': { Next, Complete, Error }
    },
    '-module': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Expose a stream as an `IObservable`.
 * 
 * @this any The `stream` to be exposed as an `IObservable`.
 * 
 * @param {*} [backPressure] An array into which subscribers may push promises
 * which will cause the observable to emit empty buffers until those promises
 * are fulfilled.
 * 
 * @remarks - Originally designed for streaming zip decompression, the observer would 
 * @remarks -- push a directory creation promise into `backPressure`
 * @remarks -- observe an empty buffer emission
 * @remarks -- push a file creation promise into `backPressure`
 * @remarks -- observe an empty buffer emission
 * @remarks -- not push another promise
 * @remarks -- and get a buffer with data it could write to the file.
 * @remarks - If the file handle backs up, it would push a promise that would 
 * be fulfilled with the `drain` event fired. 
 */
function subscribe(backPressure) {
  var stream = this

  return create(observer => {
    stream
      .on('error', observer[Error])
      .on('end', observer[Complete])
      .on('data', data => {

        // emit buffer
        observer[Next](data)

        // throttle stream
        throttle(backPressure, observer)
      })
  })
}

function throttle(backPressure, observer) {
  var stream = this

  if (backPressure.length == 0)
    return

  // pump empty buffers to flush back pressure
  stream.pause()
  process.nextTick(async () => {
    while (backPressure.length) {
      var promise = Promise.all(backPressure)
      backPressure.length = 0
      await promise

      // iterators reporting back pressure may safely ignore
      // the next buffer yielded to them. This provides iterators
      // a way to 'await' promises (e.g. directory creation)
      observer.next(EmptyBuffer)
    }
    stream.resume()
  })
}

module[ExportExtension](Stream, subscribe)