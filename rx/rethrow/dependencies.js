exports['@kingjs'] = {
  reflect: {
    exportExtension: require('@kingjs/reflect.export-extension'),
  },
  rx: {
    IObservable: require('@kingjs/rx.i-observable'),
    Spy: require('@kingjs/rx.spy'),
  },
}
exports['assert'] = require('assert')