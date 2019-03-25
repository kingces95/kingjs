exports['@kingjs'] = {
  AsyncGenerator: require('@kingjs/async-generator'),
  Generator: require('@kingjs/generator'),
  IObserver: require('@kingjs/i-observer'),
  promise: {
    sleep: require('@kingjs/promise.sleep'),
  },
  rx: {
    create: require('@kingjs/rx.create'),
  },
}
exports['events'] = require('events')