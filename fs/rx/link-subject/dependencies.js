exports['@kingjs'] = {
  fs: {
    rx: {
      PathSubject: require('@kingjs/fs.rx.path-subject'),
    },
  },
  reflect: {
    createSymbol: require('@kingjs/reflect.create-symbol'),
  },
  rx: {
    BehaviorSubject: require('@kingjs/rx.behavior-subject'),
    Pool: require('@kingjs/rx.pool'),
    WindowBy: require('@kingjs/rx.window-by'),
  },
}
exports['fs'] = require('fs')
exports['path'] = require('path')