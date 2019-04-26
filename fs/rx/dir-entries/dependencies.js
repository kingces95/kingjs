exports['@kingjs'] = {
  linq: {
    ZipJoin: require('@kingjs/linq.zip-join'),
  },
  path: {
    makeAbsolute: require('@kingjs/path.make-absolute'),
  },
  reflect: {
    exportExtension: require('@kingjs/reflect.export-extension'),
  },
  rx: {
    GroupBy: require('@kingjs/rx.group-by'),
    IObservable: require('@kingjs/rx.i-observable'),
    Pool: require('@kingjs/rx.pool'),
    RollingSelect: require('@kingjs/rx.rolling-select'),
    SelectMany: require('@kingjs/rx.select-many'),
  },
}
exports['fs'] = require('fs')