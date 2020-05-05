exports['@kingjs'] = {
  fs: {
    rx: {
      PathSubject: require('@kingjs/fs.rx.path-subject'),
    },
  },
  linq: {
    ZipJoin: require('@kingjs/linq.zip-join'),
  },
  reflect: {
    exportExtension: require('@kingjs/reflect.export-extension'),
  },
  rx: {
    GroupBy: require('@kingjs/rx.group-by'),
    Log: require('@kingjs/rx.log'),
    Pool: require('@kingjs/rx.pool'),
    RollingSelect: require('@kingjs/rx.rolling-select'),
    SelectMany: require('@kingjs/rx.select-many'),
  },
}
exports['fs'] = require('fs')
exports['path'] = require('path')