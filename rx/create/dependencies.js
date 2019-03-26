exports['@kingjs'] = {
  IObserver: require('@kingjs/i-observer'),
  promise: {
    sleep: require('@kingjs/promise.sleep'),
  },
  reflect: {
    is: require('@kingjs/reflect.is'),
  },
  rx: {
    Subject: require('@kingjs/rx.subject'),
  },
}
exports['assert'] = require('assert')