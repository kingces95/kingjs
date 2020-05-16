var { 
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Next, Complete, Error },
    '-rx': { create },
    '-module': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var DefaultBufferLength = 1
var DefaultBounce = o => (o.shift(), o)

/**
 * @description Returns an `IObservable` which observes a `spaceAvailable` `IObservable`
 * to maintain a running emission quota. Once the quota is reached, observations are buffered.
 * If the buffer is overrun a callback decides which observation to bounce.
 * 
 * @param spaceAvailable An `IObservable` which emits numbers which are added to
 * a running emission quota.
 * @param bufferLength The size of the buffer before its overrun. Default is 1.
 * @param bounce A callback invoked when the buffer is overrun.
 * 
 * @callback bounceIndex
 * @param buffer An Array of length `bufferLength + 1` where lower indices
 * hold older observations.
 * @returns Returns an array of length `bufferLength`. Default shifts the array.
 */
function bounce(
  spaceAvailable,
  bufferLength = DefaultBufferLength,
  bounce = DefaultBounce
) {
  var observable = this

  return create(observer => {
    var quota = 0
    var buffer = []

    function drain() {
      while (quota && buffer.length) {
        observer[Next](buffer.shift())
        quota--
      }
    }

    spaceAvailable[Subscribe](o => {
      quota += o
      drain()
    })

    return observable[Subscribe](
      o => {
        buffer.push(o)

        if (buffer.length > bufferLength)
          buffer = bounce(buffer)
        assert(buffer.length == bufferLength)

        drain()
      },
      () => observer[Complete](),
      o => observer[Error](o)
    )
  })
}

ExportExtension(module, IObservable, bounce)
