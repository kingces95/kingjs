exports['@kingjs'] = {
  Dictionary: require('@kingjs/dictionary'),
  IEnumerable: require('@kingjs/i-enumerable'),
  IEnumerator: require('@kingjs/i-enumerator'),
  reflect: {
    exportExtension: require('@kingjs/reflect.export-extension'),
    implementIEnumerable: require('@kingjs/reflect.implement-i-enumerable'),
  },
}
exports['deepEquals'] = require('deep-equals')