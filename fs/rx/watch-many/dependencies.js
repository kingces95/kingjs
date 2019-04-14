exports['@kingjs'] = {
  fs: {
    rx: {
      watch: require('@kingjs/fs.rx.watch'),
    },
  },
  linq: {
    ZipJoin: require('@kingjs/linq.zip-join'),
  },
  path: {
    makeAbsolute: require('@kingjs/path.make-absolute'),
  },
  rx: {
    Distinct: require('@kingjs/rx.distinct'),
    GroupBy: require('@kingjs/rx.group-by'),
    IGroupedObservable: require('@kingjs/rx.i-grouped-observable'),
    IObserver: require('@kingjs/rx.i-observer'),
    Log: require('@kingjs/rx.log'),
    Pipe: require('@kingjs/rx.pipe'),
    Queue: require('@kingjs/rx.queue'),
    RollingSelect: require('@kingjs/rx.rolling-select'),
    Select: require('@kingjs/rx.select'),
    SelectMany: require('@kingjs/rx.select-many'),
    Subject: require('@kingjs/rx.subject'),
    Where: require('@kingjs/rx.where'),
  },
}
exports['deepEqual'] = require('deep-equal')
exports['fs'] = require('fs')
exports['path'] = require('path')