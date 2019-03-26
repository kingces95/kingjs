exports['@kingjs'] = {
  IEnumerable: require('@kingjs/i-enumerable'),
  IEnumerator: require('@kingjs/i-enumerator'),
  IObserver: require('@kingjs/i-observer'),
  promise: {
    sleep: require('@kingjs/promise.sleep'),
  },
  reflect: {
    exportExtension: require('@kingjs/reflect.export-extension'),
  },
  rx: {
    create: require('@kingjs/rx.create'),
  },
}
exports['assert'] = require('assert')