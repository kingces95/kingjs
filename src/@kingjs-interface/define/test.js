var { assert,
  '@kingjs': { 
    '-interface': { Map, define }
  }
} = module[require('@kingjs-module/dependencies')]()

var BFoo = Symbol('bFoo')
var YFoo = Symbol('yFoo')
var XBar = Symbol('xBar')

// demonstrate "The Diamond" where IB is indirectly inherited twice.
//      IA
//     /  \
//   IX    IY
//     \  /
//      IB

var IB = define("IB", { 
  members: { foo: BFoo }
});
var IX = define("IX", { 
  members: { bar: XBar },
  bases: [ IB ] 
})
var IY = define("IY", { 
  members: { foo: YFoo },
  bases: [ IB ] 
})
var IA = define("IA", {
  bases: [ IX, IY ]
})

var aMap = IA[Map]()
assert.equal(aMap[BFoo], 'Foo')
assert.equal(aMap[YFoo], 'Foo')
assert.equal(aMap[XBar], 'Bar')