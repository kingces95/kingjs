exports['@kingjs'] = {
  linq: {
    ZipJoin: require('@kingjs/linq.zip-join'),
  },
  reflect: {
    exportExtension: require('@kingjs/reflect.export-extension'),
  },
  rx: {
    RollingSelect: require('@kingjs/rx.rolling-select'),
    SelectMany: require('@kingjs/rx.select-many'),
  },
}
exports['fs'] = require('fs')