var { assert,
  '@kingjs': {
    '-module': { ExportInterface },
    '-interface': { Interface }
  }
} = module[require('@kingjs-module/dependencies')]()

var Bar = Symbol('bar')

class IBar extends Interface {
  static get Bar() { return Bar }
}

module[ExportInterface]({
  members: { Foo: null }, 
  bases: [ IBar ]
})

var IFoo = module.exports

assert.equal(IFoo.name, 'IFoo')
assert.equal(IFoo.Foo, Symbol.for('IFoo.foo, @acme'))
assert.equal(IFoo.Bar, Bar)