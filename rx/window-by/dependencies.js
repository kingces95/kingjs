exports['@kingjs'] = {
  reflect: {
    exportExtension: require('@kingjs/reflect.export-extension'),
  },
  rx: {
    IGroupedObservable: require('@kingjs/rx.i-grouped-observable'),
    IObservable: require('@kingjs/rx.i-observable'),
    IObserver: require('@kingjs/rx.i-observer'),
    IPublishedObservable: require('@kingjs/rx.i-published-observable'),
    Subject: require('@kingjs/rx.subject'),
  },
}
exports['assert'] = require('assert')