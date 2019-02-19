exports['@kingjs'] = {
  IEnumerable: require('@kingjs/i-enumerable'),
  IEnumerator: require('@kingjs/i-enumerator'),
  IOrderedEnumerable: require('@kingjs/i-ordered-enumerable'),
  linq: {
    defaultLessThan: require('@kingjs/linq.default-less-than'),
    ToArray: require('@kingjs/linq.to-array'),
  },
  reflect: {
    exportExtension: require('@kingjs/reflect.export-extension'),
  },
}
exports['kingjs'] = require('kingjs')