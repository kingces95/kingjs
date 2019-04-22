exports['@kingjs'] = {
  Generator: require('@kingjs/generator'),
  IEnumerable: require('@kingjs/i-enumerable'),
  IEnumerator: require('@kingjs/i-enumerator'),
  IIterable: require('@kingjs/i-iterable'),
  packageVersion: {
    parse: require('@kingjs/package-version.parse'),
  },
  promise: {
    ToObservable: require('@kingjs/promise.to-observable'),
  },
  reflect: {
    implementIEnumerable: require('@kingjs/reflect.implement-i-enumerable'),
    implementInterface: require('@kingjs/reflect.implement-interface'),
  },
  rx: {
    from: require('@kingjs/rx.from'),
    IObservable: require('@kingjs/rx.i-observable'),
  },
}
exports['events'] = require('events')