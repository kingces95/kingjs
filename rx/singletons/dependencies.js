exports['@kingjs'] = {
  reflect: {
    createSymbol: require('@kingjs/reflect.create-symbol'),
  },
  rx: {
    IObservable: require('@kingjs/rx.i-observable'),
    IObserver: require('@kingjs/rx.i-observer'),
    ProxySubject: require('@kingjs/rx.proxy-subject'),
    Select: require('@kingjs/rx.select'),
    Where: require('@kingjs/rx.where'),
  },
}
exports['assert'] = require('assert')