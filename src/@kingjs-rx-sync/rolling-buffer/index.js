var { 
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Next },
    '-rx': {
      '-sync': { Aggregate,
        '-static': { create }
      }
    },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var DefaultBufferSize = 2
var Options = { name: rollingBuffer.name }

/**
 * @description Emit a sliding window of values.
 * @param [selector] Selects a value from the window (default is identity). 
 * @param [size] The window size (default 1).
 * @returns Returns an `IObservable` which emits arrays containing the current 
 * value followed by previously emitted values.
 * 
 * @remarks The array is reused between emissions.
 */
function rollingBuffer(size = DefaultBufferSize) {
  return this[Aggregate](
    (buffer, current) => {
      buffer.unshift(current)
      if (buffer.length > size)
        buffer.pop()
      
      return buffer
    }, []
  )
}

module[ExportExtension](IObservable, rollingBuffer)
