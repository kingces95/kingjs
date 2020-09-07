var { assert,
  '@kingjs': {
    EmptyObject,
    IObservable,
    IObserver: { Next, Complete, Error },
    IGroupedObservable,
    IGroupedObservable: { Subscribe, Key },
    '-string': { Decapitalize },
    '-rx': {
      '-observer': { SubscriptionTracker },
      '-sync': {
        '-static': { create }
      }
    },
    '-module': { ExportInterfaceExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var Plus = '+'
var Minus = '-'
var Delta = 'Δ'
var Arrow = '~'
var Exclamation = '!'

class Event {
  constructor(id, path, value, previousPath) {
    var name = this.constructor.name[Decapitalize]()
    if (name == 'err') name = 'error'
    if (name == 'done') name = 'complete'
    this[name] = true

    if (id !== undefined) this.id = id
    if (path !== undefined) this.path = path
    if (value !== undefined) this.value = value
    if (previousPath !== undefined) this.previousPath = previousPath
  }
}
class Found extends Event { 
  toString() { return `${Plus} ${this.path}` } 
}
class Change extends Event { 
  toString() { return `${Delta} ${this.path}` } 
}
class Lost extends Event { 
  toString() { return `${Minus} ${this.path}` } 
}
class Move extends Event { 
  toString() { return `${Arrow} ${this.previousPath} -> ${this.path}` } 
}
class Err extends Event { 
  toString() { return `${Exclamation} ${this.value}` } 
}

/**
 * @description 
 * @this any The source `IObservable` whose emitted value are mapped.
 * @returns Returns a new `IObservable` that emits mapped values.
 */
function materialize(options = EmptyObject) {
  return create(observer => {
    var subscription = new SubscriptionTracker(observer)

    function error(e, id, path) {
      this[Next](new Err(id, path, e))
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
                          this[Next](new Found(id, path, value))
                        else
                          this[Next](new Move(id, path, value, previousPath))

                        first = false
                        return
                      }

                      this[Next](new Change(id, path, value))
                    },
                    [Complete]() { },
                    [Error](e) { 
                      error.call(this, e, id, path)
                    }
                  })
                )
              },
              [Complete]() { 
                this[Next](new Lost(id, path))
                previousPath = null
              },
              [Error](e) { 
                error.call(this, e, id) 
              }
            })
          )
        },
        [Complete]() {
          if (subscription.cancelled)
            return

          this[Complete]()
        },
        [Error](e) { 
          error.call(this, e) 
        }
      })
    )
  })
}

module[ExportInterfaceExtension](IObservable, materialize)
