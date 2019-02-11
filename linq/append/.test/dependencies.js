exports['@kingjs'] = {
  assertShimmed: require('@kingjs/assert-shimmed'),
  IEnumerable: require('@kingjs/i-enumerable'),
  linq: {
    Concat: require('@kingjs/linq.concat'),
    toArray: require('@kingjs/linq.to-array'),
  },
  reflect: {
    exportExtension: require('@kingjs/reflect.export-extension'),
  },
}
exports['kingjs'] = require('kingjs')