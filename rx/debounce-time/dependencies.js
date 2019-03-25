exports['@kingjs'] = {
  IObservable: require('@kingjs/i-observable'),
  IObserver: require('@kingjs/i-observer'),
  linq: {
    ToObservable: require('@kingjs/linq.to-observable'),
  },
  reflect: {
    exportExtension: require('@kingjs/reflect.export-extension'),
  },
  rx: {
    create: require('@kingjs/rx.create'),
  },
}
exports['assert'] = require('assert')