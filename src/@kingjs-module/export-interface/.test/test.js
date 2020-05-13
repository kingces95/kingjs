var { assert,
  '@kingjs': {
    '-module': { ExportInterface },
    '-interface': { Interface }
  }
} = module[require('@kingjs-module/dependencies')]()

var Bar = Symbol('bar')

class IBar extends Interface {
  static get bar() { return Bar }
}

module[ExportInterface]({
  members: { foo: null }, 
  bases: [ IBar ]
})

var IFoo = module.exports

assert.equal(IFoo.name, 'IFoo')
assert.equal(IFoo.foo, Symbol.for('IFoo.foo, @acme'))
assert.equal(IFoo.bar, Bar)