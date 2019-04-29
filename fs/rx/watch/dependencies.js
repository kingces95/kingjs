exports['@kingjs'] = {
  path: {
    makeAbsolute: require('@kingjs/path.make-absolute'),
  },
  rx: {
    IGroupedObservable: require('@kingjs/rx.i-grouped-observable'),
    IObserver: require('@kingjs/rx.i-observer'),
    Subject: require('@kingjs/rx.subject'),
  },
}
exports['fs'] = require('fs')