exports['@kingjs'] = {
  buffer: {
    Append: require('@kingjs/buffer.append'),
  },
  reflect: {
    createSymbol: require('@kingjs/reflect.create-symbol'),
    is: require('@kingjs/reflect.is'),
  },
  rx: {
    ProxySubject: require('@kingjs/rx.proxy-subject'),
  },
}
exports['assert'] = require('assert')
exports['path'] = require('path')