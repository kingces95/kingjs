exports['@kingjs'] = {
  fs: {
    rx: {
      PathSubject: require('@kingjs/fs.rx.path-subject'),
      StatsSubject: require('@kingjs/fs.rx.stats-subject'),
    },
  },
  path: {
    makeAbsolute: require('@kingjs/path.make-absolute'),
  },
  reflect: {
    exportExtension: require('@kingjs/reflect.export-extension'),
  },
  rx: {
    create: require('@kingjs/rx.create'),
    DistinctUntilChanged: require('@kingjs/rx.distinct-until-changed'),
    IGroupedObservable: require('@kingjs/rx.i-grouped-observable'),
    IObservable: require('@kingjs/rx.i-observable'),
    Pool: require('@kingjs/rx.pool'),
    WindowBy: require('@kingjs/rx.window-by'),
  },
}
exports['fs'] = require('fs')