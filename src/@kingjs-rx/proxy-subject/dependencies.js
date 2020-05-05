exports['@kingjs'] = {
  reflect: {
    createSymbol: require('@kingjs/reflect.create-symbol'),
    is: require('@kingjs/reflect.is'),
  },
  rx: {
    IObservable: require('@kingjs/rx.i-observable'),
    IObserver: require('@kingjs/rx.i-observer'),
    Subject: require('@kingjs/rx.subject'),
  },
}
exports['assert'] = require('assert')