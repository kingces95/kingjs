exports['@kingjs'] = {
  path: {
    makeAbsolute: require('@kingjs/path.make-absolute'),
  },
  reflect: {
    exportExtension: require('@kingjs/reflect.export-extension'),
  },
  rx: {
    create: require('@kingjs/rx.create'),
    IObservable: require('@kingjs/rx.i-observable'),
    IObserver: require('@kingjs/rx.i-observer'),
  },
}
exports['assert'] = require('assert')
exports['fs'] = require('fs')
exports['path'] = require('path')