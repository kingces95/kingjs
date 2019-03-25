exports['@kingjs'] = {
  IObserver: require('@kingjs/i-observer'),
  promise: {
    sleep: require('@kingjs/promise.sleep'),
  },
  rx: {
    create: require('@kingjs/rx.create'),
  },
}
exports['events'] = require('events')