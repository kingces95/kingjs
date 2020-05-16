var { 
  assert,
  '@kingjs': {
    rx: { 
      Subject,
      IObservable,
      IGroupedObservable: { Key },
      IObservable: { Subscribe },
      IObserver: { Next, Complete, Error },
      IPublishedObservable: { Value },
    },
    reflect: { 
      ExportExtension
    },
  }
} = module[require('@kingjs-module/dependencies')]()

var DefaultKeySelector = o => o
var DefaultGroupActivator = (o, k) => new Subject()
var DefaultResultSelector = (o, k) => o
var DefaultGroupCloser = (o, k) => false

class GroupBySubject extends Subject {
  constructor(
    activate,
    onSubscribe) {

    super(activate, onSubscribe)

    this[Value] = { }
  }

  get groups() { return this[Value] }
}

/**
 * @description Returns an `IObservable` that emits an `IGroupedObservable`
 * for each group identified by `keySelector`.
 * 
 * @this any The `IObservable` to group.
 * 
 * @param [keySelector] A callback that selects a key for each emitted value.
 * @param [resultSelector] A callback that maps each value before being 
 * emitted by its `IGroupedObservable`.
 * @param [groupActivator] A callback that activates a subject to act as
 * a new group given the group's key.
 * @param [groupCloser] A callback that, given a group's key and the next
 * emission, returns false if the group should instead be completed. 
 * 
 * @callback keySelector
 * @param value The value emitted by `this`.
 * @returns Returns a primitive key used to group the value.
 * 
 * @callback groupActivator
 * @param key The group's key.
 * @returns Returns a `Subject` to be used to emit values for the group
 * identified by `key`.
  * 
 * @callback resultSelector
 * @param key The group's key.
 * @param value The group's next value.
 * @returns Returns a projection of the value that would otherwise be 
 * emitted by a group identified by `key`.
* 
 * @callback groupCloser
 * @param key The group's key.
 * @param value The group's next value.
 * @returns Returns `true` to complete the group instead of emitting `value`
 * or false to emit the `value`.
 * 
 * @returns Returns an `IObservable` that emits `IGroupedObservable`.
 * 
 * @remarks The `key` returned by `callback` is used as a property name into
 * an object which acts as the dictionary of groups. As such, `key` should
 * be primitive.
 */
function groupBy(
  keySelector = DefaultKeySelector, 
  groupActivator = DefaultGroupActivator,
  resultSelector = DefaultResultSelector,
  groupCloser = DefaultGroupCloser
) {

  var observable = this

  return new GroupBySubject(
    observer => {
      var groups = observer.groups

      return observable[Subscribe](
        o => {
          var key = keySelector(o)

          var group = groups[key]
          if (!group) {

            // activate and cache group
            group = groups[key] = groupActivator(key)

            // implement IGroupedObservable
            group[Key] = key 

            // emit group
            observer[Next](group)
          }

          if (groupCloser(o, key)) {
            group[Complete]()
            delete groups[key]
            return
          }

          group[Next](resultSelector(o, key))
        },
        () => {
          for (var key in groups) {
            groups[key][Complete]()
            delete groups[key]
          }
          observer[Complete]()
        },
        o => {
          for (var key in groups) {
            groups[key][Error](o)
            delete groups[key]
          }
          observer[Error](o)
        }
      )
    },
    (self, next, finished) => {
      if (finished)
        return
        
      var groups = self.groups
      for (var key in groups)
        next(groups[key])
    }
  )
}

ExportExtension(module, IObservable, groupBy)
