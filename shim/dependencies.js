exports['@kingjs'] = {
  Generator: require('@kingjs/generator'),
  IEnumerable: require('@kingjs/i-enumerable'),
  IEnumerator: require('@kingjs/i-enumerator'),
  IEventBroadcaster: require('@kingjs/i-event-broadcaster'),
  IEventDetunable: require('@kingjs/i-event-detunable'),
  IEventTunable: require('@kingjs/i-event-tunable'),
  IIterable: require('@kingjs/i-iterable'),
  IObservable: require('@kingjs/i-observable'),
  IObserver: require('@kingjs/i-observer'),
  linq: {
    ToObservable: require('@kingjs/linq.to-observable'),
  },
  packageVersion: {
    parse: require('@kingjs/package-version.parse'),
  },
  reflect: {
    implementIEnumerable: require('@kingjs/reflect.implement-i-enumerable'),
    implementInterface: require('@kingjs/reflect.implement-interface'),
  },
}
exports['events'] = require('events')