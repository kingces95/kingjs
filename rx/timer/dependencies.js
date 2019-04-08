exports['@kingjs'] = {
  promise: {
    sleep: require('@kingjs/promise.sleep'),
  },
  rx: {
    create: require('@kingjs/rx.create'),
    IObserver: require('@kingjs/rx.i-observer'),
  },
}
exports['assert'] = require('assert')