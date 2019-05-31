exports['@kingjs'] = {
  fs: {
    rx: {
      subject: {
        Dir: require('@kingjs/fs.rx.subject.dir'),
        DirLink: require('@kingjs/fs.rx.subject.dir-link'),
        File: require('@kingjs/fs.rx.subject.file'),
        FileLink: require('@kingjs/fs.rx.subject.file-link'),
        Path: require('@kingjs/fs.rx.subject.path'),
      },
    },
  },
  reflect: {
    createSymbol: require('@kingjs/reflect.create-symbol'),
    is: require('@kingjs/reflect.is'),
  },
  rx: {
    Pool: require('@kingjs/rx.pool'),
    ProxySubject: require('@kingjs/rx.proxy-subject'),
    Singletons: require('@kingjs/rx.singletons'),
    Where: require('@kingjs/rx.where'),
    WindowBy: require('@kingjs/rx.window-by'),
  },
}
exports['assert'] = require('assert')
exports['fs'] = require('fs')
exports['path'] = require('path')