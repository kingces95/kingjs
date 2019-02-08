exports['@kingjs'] = {
  Generator: require('@kingjs/generator'),
  IEnumerable: require('@kingjs/i-enumerable'),
  IEnumerator: require('@kingjs/i-enumerator'),
  IIterable: require('@kingjs/i-iterable'),
  packageVersion: {
    parse: require('@kingjs/package-version.parse'),
  },
  reflect: {
    implementIEnumerable: require('@kingjs/reflect.implement-i-enumerable'),
    implementInterface: require('@kingjs/reflect.implement-interface'),
    defineProperty: require('@kingjs/reflect.define-property'),
  },
  IInterface: require('@kingjs/i-interface'),
}