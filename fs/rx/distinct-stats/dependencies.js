exports['@kingjs'] = {
  path: {
    makeAbsolute: require('@kingjs/path.make-absolute'),
  },
  reflect: {
    exportExtension: require('@kingjs/reflect.export-extension'),
  },
  rx: {
    DistinctUntilChanged: require('@kingjs/rx.distinct-until-changed'),
    IGroupedObservable: require('@kingjs/rx.i-grouped-observable'),
    IObservable: require('@kingjs/rx.i-observable'),
    Pool: require('@kingjs/rx.pool'),
    SelectMany: require('@kingjs/rx.select-many'),
    Spy: require('@kingjs/rx.spy'),
    WindowBy: require('@kingjs/rx.window-by'),
  },
}
exports['fs'] = require('fs')