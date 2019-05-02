exports['@kingjs'] = {
  fs: {
    rx: {
      DirEntries: require('@kingjs/fs.rx.dir-entries'),
      DistinctStats: require('@kingjs/fs.rx.distinct-stats'),
      watch: require('@kingjs/fs.rx.watch'),
    },
  },
  rx: {
    Finalize: require('@kingjs/rx.finalize'),
    IGroupedObservable: require('@kingjs/rx.i-grouped-observable'),
    IObservable: require('@kingjs/rx.i-observable'),
    IObserver: require('@kingjs/rx.i-observer'),
    Log: require('@kingjs/rx.log'),
    Publish: require('@kingjs/rx.publish'),
    SelectMany: require('@kingjs/rx.select-many'),
  },
}
exports['path'] = require('path')