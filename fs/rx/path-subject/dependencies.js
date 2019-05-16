exports['@kingjs'] = {
  buffer: {
    Append: require('@kingjs/buffer.append'),
  },
  fs: {
    rx: {
      InodeSubject: require('@kingjs/fs.rx.inode-subject'),
    },
  },
  PathBuffer: require('@kingjs/path-buffer'),
  reflect: {
    createSymbol: require('@kingjs/reflect.create-symbol'),
    is: require('@kingjs/reflect.is'),
  },
  rx: {
    Pool: require('@kingjs/rx.pool'),
    ProxySubject: require('@kingjs/rx.proxy-subject'),
    WindowBy: require('@kingjs/rx.window-by'),
  },
}
exports['assert'] = require('assert')
exports['fs'] = require('fs')
exports['path'] = require('path')