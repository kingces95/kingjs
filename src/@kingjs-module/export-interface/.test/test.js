var { assert,
  '@kingjs': {
    '-interface': { Interface },
    '-module': { ExportInterface }
  }
} = module[require('@kingjs-module/dependencies')]()

var Bar = Symbol('bar')

class IBar extends Interface {
  static get Bar() { return Bar }
}

module[ExportInterface]({
  members: { foo: null }, 
  bases: [ IBar ]
})

var IFoo = module.exports

assert.equal(IFoo.name, 'IFoo')
assert.equal(IFoo.Foo, Symbol.for('IFoo.foo, @acme'))
assert.equal(IFoo.Bar, Bar)