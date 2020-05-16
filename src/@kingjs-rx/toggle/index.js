var { 
  '@kingjs': {
    rx: { 
      create, 
      IObservable,
      IGroupedObservable: { Key },
      IObservable: { Subscribe },
      IObserver: { Next, Complete, Error }
    },
    reflect: { 
      ExportExtension
    },
  }
} = module[require('@kingjs-module/dependencies')]()

var DefaultKeySelector = o => o

/**
 * @description Returns an `IObservable` that for each source emission of
 * the source `IObservable` emits an `IGroupedObservable` or completes a 
 * the `IGroupedObservable` previously emitted for that source emission.
 * 
 * @this any The source `IObservable`.
 * 
 * @param [activator] A callback that selects an `IObservable` given a
 * emission from the source `IObservable`.
 * @param [keySelector] A callback that selects a `Key` to be attached to
 * the `IObservable` returned by `activator`.
 * 
 * @returns Returns an `IObservable` that emits `IGroupedObservable` for a
 * source emission that is completed by a subsequent matching source emission.
 */
function toggle(
  activator, 
  keySelector = DefaultKeySelector) {

  var observable = this

  return create(observer => {
    var groups = { }

    return observable[Subscribe](
      o => {
        var key = keySelector(o)
        var group = groups[key]

        // toggle off
        if (group) {
          group[Complete]()
          delete groups[key];
          return;
        } 

        // activate observable
        group = activator(o)

        // implement IGroupedObservable
        group[Key] = key

        // activate and cache group
        groups[key] = group

        // emit group
        observer[Next](group)
      },
      () => {
        for (var key in groups)
          groups[key][Complete]()
        observer[Complete]()
      },
      o => {
        for (var key in groups)
          groups[key][Error](o)
        observer[Error](o)
      }
    )
  })
}

ExportExtension(module, IObservable, toggle)
