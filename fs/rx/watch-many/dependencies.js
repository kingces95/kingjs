exports['@kingjs'] = {
  fs: {
    rx: {
      DirEntries: require('@kingjs/fs.rx.dir-entries'),
      DistinctStats: require('@kingjs/fs.rx.distinct-stats'),
      watch: require('@kingjs/fs.rx.watch'),
    },
  },
  path: {
    test: require('@kingjs/path.test'),
  },
  reflect: {
    createSymbol: require('@kingjs/reflect.create-symbol'),
  },
  rx: {
    Do: require('@kingjs/rx.do'),
    IGroupedObservable: require('@kingjs/rx.i-grouped-observable'),
    Publish: require('@kingjs/rx.publish'),
    SelectMany: require('@kingjs/rx.select-many'),
    Where: require('@kingjs/rx.where'),
  },
}
exports['path'] = require('path')