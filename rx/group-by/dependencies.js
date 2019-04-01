exports['@kingjs'] = {
  IGroupedObservable: require('@kingjs/i-grouped-observable'),
  IObservable: require('@kingjs/i-observable'),
  IObserver: require('@kingjs/i-observer'),
  reflect: {
    exportExtension: require('@kingjs/reflect.export-extension'),
  },
  rx: {
    create: require('@kingjs/rx.create'),
    Subject: require('@kingjs/rx.subject'),
  },
}
exports['assert'] = require('assert')