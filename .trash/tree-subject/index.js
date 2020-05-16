// SHOULD PROB BE TRASHED
var {
  assert,
  events: { EventEmitter },
  '@kingjs': { 
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Next },
    IPublishedObservable: { Value },
    '-reflect': { createSymbol },
    '-rx': { Subject }
  },
} = module[require('@kingjs-module/dependencies')]()

var IsNode = createSymbol(module, 'isNode')
var SelectMany = createSymbol(module, 'selectMany')
var Prune = createSymbol(module, 'prune')

var DefaultIsNode = o => o instanceof TreeSubject
var DefaultSelectMany = o => o[Value]
var DefaultPrune = (o, callback) => {
  if (o instanceof IObservable)
    o[Subscribe](null, callback)
}

/**
 * @description The Tree Subject.
 */
class TreeSubject extends Subject {

  constructor(
    activate,
    isNode = DefaultIsNode,
    selectMany = DefaultSelectMany,
    prune = DefaultPrune) {

    super(activate, (next, disposed) => {
      if (disposed)
        return

      var subscribe = iterable => {
        for (var value of iterable) {
          if (!this[IsNode](value)) {
            next(value)
            continue
          }

          // recurse
          subscribe(this[SelectMany](value))
        }
      }

      subscribe(this[Value])
    })

    this[IsNode] = isNode
    this[SelectMany] = selectMany
    this[Value] = new Set()
    this[Prune] = prune
  }

  // IObserver
  [Next](x) {
    super[Next](x)

    var set = this[Value]
    set.add(x)
    this[Prune](x, 
      () => set.delete(x)
    )
  }
}

module.exports = TreeSubject