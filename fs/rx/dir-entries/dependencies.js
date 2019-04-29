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
    Log: require('@kingjs/rx.log'),
    Pool: require('@kingjs/rx.pool'),
    RollingSelect: require('@kingjs/rx.rolling-select'),
    SelectMany: require('@kingjs/rx.select-many'),
    Subject: require('@kingjs/rx.subject'),
  },
}
exports['fs'] = require('fs')