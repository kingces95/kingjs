exports['@kingjs'] = {
  fs: {
    rx: {
      PathSubject: require('@kingjs/fs.rx.path-subject'),
    },
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
exports['fs'] = require('fs')