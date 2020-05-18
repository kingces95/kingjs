var { 
  '@kingjs': {
    IObservable,
    IObserver: { Next, Complete, Error },
    '-rx-sync': { Do },
    '-string': { Expand },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var EmptyObject = { }
var CompleteMessage = 'COMPLETE'
var ErrorMessage = 'ERROR'

/**
 * @description Returns an `IObservable` that logs life-cycle events.
 * 
 * @this any The source `IObservable` whose live-cycle events are logged.
 * 
 * @param label A label identifying the log.
 * @param [format] Optional format string to display emitted values.
 * 
 * @returns Returns a new `IObservable` that behaves like the source `IObservable`.
 */
function log(label, options = EmptyObject) {
  var { 
    format, 
    writeLine = o => console.log(o)
  } = options

  var log = (message) => writeLine(`${label}: ${message}`)

  return this[Do]({
    [Next](o) {
      var message = o
      if (format)
        message = format[Expand](o)
      log(message)
    },
    [Complete]() {
      log(CompleteMessage)
    },
    [Error]() {
      log(ErrorMessage)
    }
  })
}

module[ExportExtension](IObservable, log)
