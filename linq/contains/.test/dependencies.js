exports['@kingjs'] = {
  IEnumerable: require('@kingjs/i-enumerable'),
  IEnumerator: require('@kingjs/i-enumerator'),
  reflect: {
    exportExtension: require('@kingjs/reflect.export-extension'),
  },
  linq: {
    defaultEqual: require('@kingjs/linq.default-equal'),
  },
}
exports['kingjs'] = require('kingjs')