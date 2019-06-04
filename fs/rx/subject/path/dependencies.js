exports['@kingjs'] = {
  fs: {
    rx: {
      subject: {
        Dir: require('@kingjs/fs.rx.subject.dir'),
        File: require('@kingjs/fs.rx.subject.file'),
        Link: require('@kingjs/fs.rx.subject.link'),
      },
    },
  },
  reflect: {
    createSymbol: require('@kingjs/reflect.create-symbol'),
    is: require('@kingjs/reflect.is'),
  },
  rx: {
    Pipe: require('@kingjs/rx.pipe'),
    Pool: require('@kingjs/rx.pool'),
    ProxySubject: require('@kingjs/rx.proxy-subject'),
    Select: require('@kingjs/rx.select'),
    Singletons: require('@kingjs/rx.singletons'),
    Where: require('@kingjs/rx.where'),
    WindowBy: require('@kingjs/rx.window-by'),
  },
}
exports['fs'] = require('fs')