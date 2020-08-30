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

var Minus = '-'
var Plus = '+'
var Delta = 'Δ'
var Exclamation = '!'

/**
 * @description 
 * @this any The source `IObservable` whose emitted value are mapped.
 * @returns Returns a new `IObservable` that emits mapped values.
 */
function toString() {
  return this
    [Select](o => {
      var { found, lost, error, change, move, id, version, path, value } = o
      
      if (o.found)
        return `${Plus} ${path}, id=${id}, version=${version}`
    })
}

module[ExportInterfaceExtension](IObservable, toString)
