exports['@kingjs'] = {
  fs: {
    rx: {
      watch: require('@kingjs/fs.rx.watch'),
    },
  },
  linq: {
    OrderBy: require('@kingjs/linq.order-by'),
    ZipJoin: require('@kingjs/linq.zip-join'),
  },
  path: {
    makeAbsolute: require('@kingjs/path.make-absolute'),
  },
  rx: {
    Debounce: require('@kingjs/rx.debounce'),
    Distinct: require('@kingjs/rx.distinct'),
    GroupBy: require('@kingjs/rx.group-by'),
    IGroupedObservable: require('@kingjs/rx.i-grouped-observable'),
    IObserver: require('@kingjs/rx.i-observer'),
    Log: require('@kingjs/rx.log'),
    Pipe: require('@kingjs/rx.pipe'),
    Pool: require('@kingjs/rx.pool'),
    RollingSelect: require('@kingjs/rx.rolling-select'),
    Select: require('@kingjs/rx.select'),
    SelectMany: require('@kingjs/rx.select-many'),
    Subject: require('@kingjs/rx.subject'),
    ToArray: require('@kingjs/rx.to-array'),
    Where: require('@kingjs/rx.where'),
  },
  TaskPool: require('@kingjs/task-pool'),
}
exports['deepEqual'] = require('deep-equal')
exports['fs'] = require('fs')
exports['path'] = require('path')