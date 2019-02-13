exports['@kingjs'] = {
  IEnumerable: require('@kingjs/i-enumerable'),
  IEnumerator: require('@kingjs/i-enumerator'),
  reflect: {
    exportExtension: require('@kingjs/reflect.export-extension'),
    implementIEnumerable: require('@kingjs/reflect.implement-i-enumerable'),
  },
  assertShimmed: require('@kingjs/assert-shimmed'),
  Dictionary: require('@kingjs/dictionary'),
}
exports['kingjs'] = require('kingjs')