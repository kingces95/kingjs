exports['@kingjs'] = {
  reflect: {
    exportExtension: require('@kingjs/reflect.export-extension'),
  },
  rx: {
    create: require('@kingjs/rx.create'),
    IObserver: require('@kingjs/rx.i-observer'),
  },
}
exports['assert'] = require('assert')