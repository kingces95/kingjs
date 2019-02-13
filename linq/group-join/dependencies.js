exports['@kingjs'] = {
  IEnumerable: require('@kingjs/i-enumerable'),
  IEnumerator: require('@kingjs/i-enumerator'),
  reflect: {
    implementIEnumerable: require('@kingjs/reflect.implement-i-enumerable'),
    exportExtension: require('@kingjs/reflect.export-extension'),
  },
  assertShimmed: require('@kingjs/assert-shimmed'),
  linq: {
    empty: require('@kingjs/linq.empty'),
    ToLookup: require('@kingjs/linq.to-lookup'),
  },
}