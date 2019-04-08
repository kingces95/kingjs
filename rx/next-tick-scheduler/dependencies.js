exports['@kingjs'] = {
  promise: {
    sleep: require('@kingjs/promise.sleep'),
  },
  reflect: {
    implementInterface: require('@kingjs/reflect.implement-interface'),
  },
  rx: {
    Scheduler: require('@kingjs/rx.scheduler'),
  },
}
exports['assert'] = require('assert')