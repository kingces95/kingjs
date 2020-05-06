var { assert,
  '@kingjs': { 
    '-property-descriptor': { lambdize }
  }
} = module[require('@kingjs-module/dependencies')]()

// create a lambda function that simply returns zero
var fooDescriptor = lambdize.call({ value: '0' }, 'foo')
assert(fooDescriptor.value.name = 'foo')
var target = Object.defineProperty({ }, 'foo', fooDescriptor)
assert(target.foo() == 0)

// create lambda accessors that simply access a property `field`
var barDescriptor = lambdize.call({ 
  get: 'this.field', 
  set: 'this.field = value'
}, 'bar')
assert(barDescriptor.get.name = 'bar')
assert(barDescriptor.set.name = 'bar')
var target = Object.defineProperty({ field: 1 }, 'bar', barDescriptor)
assert(target.bar == 1)
target.bar = 2
assert(target.field == 2)