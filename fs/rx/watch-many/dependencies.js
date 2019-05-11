exports['@kingjs'] = {
  fs: {
    rx: {
      DirEntries: require('@kingjs/fs.rx.dir-entries'),
      DistinctStats: require('@kingjs/fs.rx.distinct-stats'),
      PathSubject: require('@kingjs/fs.rx.path-subject'),
      Watch: require('@kingjs/fs.rx.watch'),
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
    GroupBy: require('@kingjs/rx.group-by'),
    IGroupedObservable: require('@kingjs/rx.i-grouped-observable'),
    Publish: require('@kingjs/rx.publish'),
    SelectMany: require('@kingjs/rx.select-many'),
    Where: require('@kingjs/rx.where'),
  },
}
exports['path'] = require('path')