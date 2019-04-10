exports['@kingjs'] = {
  reflect: {
    exportExtension: require('@kingjs/reflect.export-extension'),
  },
  rx: {
    create: require('@kingjs/rx.create'),
    DefaultScheduler: require('@kingjs/rx.default-scheduler'),
    IObservable: require('@kingjs/rx.i-observable'),
    IObserver: require('@kingjs/rx.i-observer'),
    IScheduler: require('@kingjs/rx.i-scheduler'),
  },
}
exports['assert'] = require('assert')