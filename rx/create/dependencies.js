exports['@kingjs'] = {
  AsyncGenerator: require('@kingjs/async-generator'),
  Generator: require('@kingjs/generator'),
  IObserver: require('@kingjs/i-observer'),
  promise: {
    sleep: require('@kingjs/promise.sleep'),
  },
  rx: {
    Subject: require('@kingjs/rx.subject'),
  },
}
exports['events'] = require('events')