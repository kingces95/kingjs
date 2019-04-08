exports['@kingjs'] = {
  reflect: {
    exportExtension: require('@kingjs/reflect.export-extension'),
  },
  rx: {
    IObservable: require('@kingjs/rx.i-observable'),
    SubscribeIterator: require('@kingjs/rx.subscribe-iterator'),
  },
}
exports['assert'] = require('assert')