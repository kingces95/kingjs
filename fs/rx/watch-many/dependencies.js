exports['@kingjs'] = {
  fs: {
    rx: {
      DirEntries: require('@kingjs/fs.rx.dir-entries'),
      DistinctStats: require('@kingjs/fs.rx.distinct-stats'),
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
    IGroupedObservable: require('@kingjs/rx.i-grouped-observable'),
    IObservable: require('@kingjs/rx.i-observable'),
    IObserver: require('@kingjs/rx.i-observer'),
    Log: require('@kingjs/rx.log'),
    Pool: require('@kingjs/rx.pool'),
    Publish: require('@kingjs/rx.publish'),
    SelectMany: require('@kingjs/rx.select-many'),
    Take: require('@kingjs/rx.take'),
  },
  TaskPool: require('@kingjs/task-pool'),
}
exports['deepEqual'] = require('deep-equal')
exports['fs'] = require('fs')
exports['path'] = require('path')