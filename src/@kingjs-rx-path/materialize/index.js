var { assert,
  '@kingjs': {
    IObservable,
    IObserver: { Next, Complete, Error },
    IGroupedObservable,
    IGroupedObservable: { Subscribe, Key },
    '-rx': {
      '-observer': { SubscriptionTracker },
      '-sync': {
        '-static': { create, of }
      }
    },
    '-module': { ExportInterfaceExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description 
 * @this any The source `IObservable` whose emitted value are mapped.
 * @returns Returns a new `IObservable` that emits mapped values.
 */
function materialize() {
  return create(observer => {
    var subscription = new SubscriptionTracker(observer)

    function error(e) {
      this[Next](e)
      if (subscription.cancelled)
        return

      this[Complete]()
      subscription.cancel()
    }

    return this[Subscribe](
      subscription.track({
        [Next](o) {
          assert.ok(o instanceof IGroupedObservable)
          var path = null
          var previousPath = null
          var id = o[Key]

          o[Subscribe](
            subscription.track({
              [Next](p) { 
                assert.ok(p instanceof IGroupedObservable)
                var first = true

                previousPath = path
                path = p[Key]

                p[Subscribe](
                  subscription.track({
                    [Next](l) {
                      var value = l

                      if (first) {
                        if (!previousPath)
                          this[Next]({ found: true, id, path, value })
                        else
                          this[Next]({ move: true, id, path, previousPath, value })

                        first = false
                        return
                      }

                      this[Next]({ change: true, id, path, value })
                    },
                    [Complete]() { },
                    [Error](e) { 
                      error.call(this, { error: true, id, path, value: e }) 
                    }
                  })
                )
              },
              [Complete]() { 
                this[Next]({ lost: true, id, path })
                previousPath = null
              },
              [Error](e) { 
                error.call(this, { error: true, id, value: e }) 
              }
            })
          )
        },
        [Complete]() {
          this[Next]({ complete: true })
          if (subscription.cancelled)
            return

          this[Complete]()
        },
        [Error](e) { 
          error.call(this, { error: true, value: e }) 
        }
      })
    )
  })
}

module[ExportInterfaceExtension](IObservable, materialize)
