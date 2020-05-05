exports['@kingjs'] = {
  propertyDescriptor: {
    lambdize: require('@kingjs/property-descriptor.lambdize'),
    makeLazy: require('@kingjs/property-descriptor.make-lazy'),
  },
  reflect: {
    descriptor: {
      targetInstanceOf: require('@kingjs/reflect.descriptor.target-instance-of'),
    },
    is: require('@kingjs/reflect.is'),
  },
}
exports['assert'] = require('assert')