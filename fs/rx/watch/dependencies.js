exports['@kingjs'] = {
  path: {
    makeAbsolute: require('@kingjs/path.make-absolute'),
  },
  rx: {
    create: require('@kingjs/rx.create'),
    IObservable: require('@kingjs/rx.i-observable'),
    IObserver: require('@kingjs/rx.i-observer'),
  },
}
exports['fs'] = require('fs')