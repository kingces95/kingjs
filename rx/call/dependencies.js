exports['@kingjs'] = {
  reflect: {
    exportExtension: require('@kingjs/reflect.export-extension'),
  },
  rx: {
    IObservable: require('@kingjs/rx.i-observable'),
    IObserver: require('@kingjs/rx.i-observer'),
    clock: require('@kingjs/rx.clock'),
    create: require('@kingjs/rx.create'),
  },
}
exports['assert'] = require('assert')