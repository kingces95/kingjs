exports['@kingjs'] = {
  getOwnPropertyKeys: require('@kingjs/get-own-property-keys'),
  is: require('@kingjs/is'),
  propertyDescriptor: {
    constructAccessor: require('@kingjs/property-descriptor.construct-accessor'),
    constructField: require('@kingjs/property-descriptor.construct-field'),
    constructProperty: require('@kingjs/property-descriptor.construct-property'),
    define: require('@kingjs/property-descriptor.define'),
  },
}