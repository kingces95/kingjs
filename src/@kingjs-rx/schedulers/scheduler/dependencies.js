exports['@kingjs'] = {
  promise: {
    sleep: require('@kingjs/promise.sleep'),
  },
  reflect: {
    implementInterface: require('@kingjs/reflect.implement-interface'),
  },
  rx: {
    IScheduler: require('@kingjs/rx.i-scheduler'),
  },
}
exports['assert'] = require('assert')