exports['@kingjs'] = {
  IObservable: require('@kingjs/i-observable'),
  IObserver: require('@kingjs/i-observer'),
  reflect: {
    exportExtension: require('@kingjs/reflect.export-extension'),
  },
  rx: {
    createSync: require('@kingjs/rx.create-sync'),
  },
}
exports['assert'] = require('assert')