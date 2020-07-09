var { assert,
  '@kingjs': { 
    '-interface': { Map, define }
  }
} = module[require('@kingjs-module/dependencies')]()

var BFoo = Symbol('bFoo')
var YFoo = Symbol('yFoo')
var XBar = Symbol('xBar')
var ZFoo = Symbol('zFoo')

// demonstrate "The Diamond" where IB is indirectly inherited twice.
//        IA
//      /    \
//   IX - bar  IY - foo
//      \    /
//        IB - foo

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
assert.equal(aMap[BFoo], 'foo')
assert.equal(aMap[YFoo], 'foo')
assert.equal(aMap[XBar], 'bar')