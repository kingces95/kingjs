exports['@kingjs'] = {
  Generator: require('@kingjs/generator'),
  IEnumerable: require('@kingjs/i-enumerable'),
  IEnumerator: require('@kingjs/i-enumerator'),
  IIterable: require('@kingjs/i-iterable'),
  IObservable: require('@kingjs/i-observable'),
  IObserver: require('@kingjs/i-observer'),
  packageVersion: {
    parse: require('@kingjs/package-version.parse'),
  },
  reflect: {
    implementIEnumerable: require('@kingjs/reflect.implement-i-enumerable'),
    implementInterface: require('@kingjs/reflect.implement-interface'),
  },
  rx: {
    create: require('@kingjs/rx.create'),
    from: require('@kingjs/rx.from'),
  },
}
exports['events'] = require('events')