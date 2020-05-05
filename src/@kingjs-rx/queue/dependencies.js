exports['@kingjs'] = {
  array: {
    Remove: require('@kingjs/array.remove'),
  },
  reflect: {
    exportExtension: require('@kingjs/reflect.export-extension'),
  },
  rx: {
    create: require('@kingjs/rx.create'),
    IObservable: require('@kingjs/rx.i-observable'),
    IObserver: require('@kingjs/rx.i-observer'),
  },
  TaskPool: require('@kingjs/task-pool'),
}
exports['assert'] = require('assert')