exports['@kingjs'] = {
  path: {
    makeAbsolute: require('@kingjs/path.make-absolute'),
  },
  rx: {
    create: require('@kingjs/rx.create'),
    IGroupedObservable: require('@kingjs/rx.i-grouped-observable'),
    IObserver: require('@kingjs/rx.i-observer'),
  },
}
exports['fs'] = require('fs')