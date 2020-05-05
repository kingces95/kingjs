exports['@kingjs'] = {
  reflect: {
    exportExtension: require('@kingjs/reflect.export-extension'),
  },
  rx: {
    IObservable: require('@kingjs/rx.i-observable'),
    Zip: require('@kingjs/rx.zip'),
  },
}
exports['assert'] = require('assert')