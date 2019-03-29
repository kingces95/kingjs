exports['@kingjs'] = {
  IObservable: require('@kingjs/i-observable'),
  IObserver: require('@kingjs/i-observer'),
  reflect: {
    exportExtension: require('@kingjs/reflect.export-extension'),
  },
  rx: {
    clock: require('@kingjs/rx.clock'),
    create: require('@kingjs/rx.create'),
  },
}
exports['assert'] = require('assert')