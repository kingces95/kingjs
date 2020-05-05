exports['@kingjs'] = {
  IEnumerable: require('@kingjs/i-enumerable'),
  linq: {
    Concat: require('@kingjs/linq.concat'),
    ToArray: require('@kingjs/linq.to-array'),
  },
  reflect: {
    exportExtension: require('@kingjs/reflect.export-extension'),
  },
}
exports['kingjs'] = require('kingjs')