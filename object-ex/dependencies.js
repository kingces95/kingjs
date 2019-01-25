exports['@kingjs'] = {
  getOwnPropertyKeys: require('@kingjs/get-own-property-keys'),
  is: require('@kingjs/is'),
  propertyDescriptor: {
    constructAccessor: require('@kingjs/property-descriptor.construct-accessor'),
    constructField: require('@kingjs/property-descriptor.construct-field'),
    constructProperty: require('@kingjs/property-descriptor.construct-property'),
    lambdize: require('@kingjs/property-descriptor.lambdize'),
    makeLazy: require('@kingjs/property-descriptor.make-lazy'),
    targetInstanceOf: require('@kingjs/property-descriptor.target-instance-of'),
  },
}