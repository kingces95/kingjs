exports['@kingjs'] = {
  reflect: {
    is: require('@kingjs/reflect.is'),
    descriptor: {
      targetInstanceOf: require('@kingjs/reflect.descriptor.target-instance-of'),
    },
  },
  propertyDescriptor: {
    lambdize: require('@kingjs/property-descriptor.lambdize'),
    makeLazy: require('@kingjs/property-descriptor.make-lazy'),
  },
  assertTheory: require('@kingjs/assert-theory'),
}