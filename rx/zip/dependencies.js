exports['@kingjs'] = {
  IEnumerable: require('@kingjs/i-enumerable'),
  IEnumerator: require('@kingjs/i-enumerator'),
  IObservable: require('@kingjs/i-observable'),
  IObserver: require('@kingjs/i-observer'),
  reflect: {
    exportExtension: require('@kingjs/reflect.export-extension'),
  },
  rx: {
    create: require('@kingjs/rx.create'),
  },
}
exports['assert'] = require('assert')