var { 
  ['@kingjs']: {
    rx: { 
      create, 
      Subject,
      IObservable,
      IGroupedObservable: { Key },
      IObservable: { Subscribe },
      IObserver: { Next, Complete, Error }
    },
    reflect: { 
      exportExtension
    },
  }
} = require('./dependencies');

var DefaultKeySelector = o => o;
var DefaultResultSelector = o => o;

/**
 * @description Returns an `IObservable` that emits an `IGroupedObservable`
 * for each group identified by `keySelector`.
 * 
 * @this any The `IObservable` to group.
 * 
 * @param [keySelector] A callback that selects a key for each emitted value.
 * @param [resultSelector] A callback that maps each value before being 
 * emitted by its `IGroupedObservable`.
 * 
 * @callback keySelector
 * @param value The value emitted by `this`.
 * @returns Returns a primitive key used to group the value.
 * 
 * @returns Returns an `IObservable` that emits `IGroupedObservable`.
 * 
 * @remarks The `key` returned by `callback` is used as a property name into
 * an object which acts as the dictionary of groups. As such, `key` should
 * be primitive.
 */
function groupBy(
  keySelector = DefaultKeySelector, 
  resultSelector = DefaultResultSelector) {

  var observable = this;

  return create(observer => {
    var groups = { };

    return observable[Subscribe](
      o => {
        var key = keySelector(o);

        var group = groups[key];
        if (!group) {
          // activate and cache group
          group = groups[key] = new Subject();

          // implement IGroupedObservable
          group[Key] = key; 

          // emit group
          observer[Next](group);
        }

        return group[Next](resultSelector(o));
      },
      () => {
        for (var key in groups)
          groups[key][Complete]();
        observer[Complete]();
      },
      o => {
        for (var key in groups)
          groups[key][Error](o);
        observer[Error](o)
      }
    );
  })
}

exportExtension(module, IObservable, groupBy);
