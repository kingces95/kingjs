exports['@kingjs'] = {
  IObservable: require('@kingjs/i-observable'),
  IObserver: require('@kingjs/i-observer'),
  reflect: {
    exportExtension: require('@kingjs/reflect.export-extension'),
    is: require('@kingjs/reflect.is'),
  },
  rx: {
    create: require('@kingjs/rx.create'),
  },
}
exports['assert'] = require('assert')