exports['@kingjs'] = {
  getGenerator: require('@kingjs/get-generator'),
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