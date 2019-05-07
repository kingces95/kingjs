exports['@kingjs'] = {
  fs: {
    rx: {
      DirEntries: require('@kingjs/fs.rx.dir-entries'),
      DistinctStats: require('@kingjs/fs.rx.distinct-stats'),
      watch: require('@kingjs/fs.rx.watch'),
    },
  },
  reflect: {
    createSymbol: require('@kingjs/reflect.create-symbol'),
  },
  rx: {
    Do: require('@kingjs/rx.do'),
    IGroupedObservable: require('@kingjs/rx.i-grouped-observable'),
    Publish: require('@kingjs/rx.publish'),
    SelectMany: require('@kingjs/rx.select-many'),
  },
}
exports['path'] = require('path')