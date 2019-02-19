exports['@kingjs'] = {
  IEnumerable: require('@kingjs/i-enumerable'),
  IEnumerator: require('@kingjs/i-enumerator'),
  linq: {
    ToLookup: require('@kingjs/linq.to-lookup'),
  },
  reflect: {
    exportExtension: require('@kingjs/reflect.export-extension'),
    implementIEnumerable: require('@kingjs/reflect.implement-i-enumerable'),
  },
}
exports['kingjs'] = require('kingjs')