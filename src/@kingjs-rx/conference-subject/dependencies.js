exports['@kingjs'] = {
  fs: {
    rx: {
      subject: {
        Dir: require('@kingjs/fs.rx.subject.dir'),
        File: require('@kingjs/fs.rx.subject.file'),
      },
    },
  },
  rx: {
    IObservable: require('@kingjs/rx.i-observable'),
    IObserver: require('@kingjs/rx.i-observer'),
    ProxySubject: require('@kingjs/rx.proxy-subject'),
    Subject: require('@kingjs/rx.subject'),
  },
}
exports['fs'] = require('fs')
exports['path'] = require('path')