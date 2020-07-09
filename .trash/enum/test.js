var { assert,
  '@kingjs': { 
    '-enum': { Enum, EnumValue }    
   }
} = module[require('@kingjs-module/dependencies')]()

// var AbcFlags = define('test', {
//   a: 1 << 0,
//   b: 1 << 1,
//   c: 1 << 2,
//   ab: [ 'a', a << 1 ],
//   abc: 1 << 0 | 1 << 1 | 1 << 2,
//   bc: [ 'b', 'c' ],
//   aMask: [ 'a' ],
//   abMask: [ 'a', 'b' ],
//   bcMsk: { value: [ 'b', 'c' ], isMask: true },
// })

class AbcValue extends EnumValue {
  get a() { return this.isSet(0) }
  get b() { return this.isSet(1) }
  get c() { return this.isSet(2) }
  get aMask() { return this.mask(0, 1) }
  get abMask() { return this.mask(0, 1) }
  get bcMask() { return this.mask(1, 2) }
}

class Abc extends Enum { }
Abc.a = new AbcValue(1 << 0)
Abc.b = new AbcValue(1 << 1)
Abc.c = new AbcValue(1 << 2)
Abc.ab = new AbcValue(Abc.a | Abc.b)
Abc.bc = new AbcValue(Abc.b | Abc.c)
Abc.abc = new AbcValue(Abc.a | Abc.b | Abc.c)

var { a, b, c, aMask, abMask, bcMask } = Abc

var value = a
assert.ok(value.a)
assert.ok(!value.b)
assert.ok(value.abMask.a)
assert.ok(!value.bcMask.a)

// assert.ok(AbcFlags instanceof Enum)
// assert.ok(a instanceof Number)
// assert.ok(a instanceof EnumValue)
// assert.ok(a instanceof AbcFlags)
// assert.ok(a == 1)
// assert.ok(a !== 1)
// assert.ok(a | 1 === 1)

// assert.equal(a, 1 << 0)
// assert.equal(b, 1 << 1)
// assert.equal(c, 1 << 2)
// assert.equal(ab, a | b)
// assert.equal(abc, a | b | c)
// assert.equal(bc, b | c)
// assert.equal(aMask, a)
// assert.equal(abMask, a | b)
// assert.equal(bcMask, b | c)

// var values = [ a, b, c, ab, abc, bc ]
// var masks = [ aMask, abMask, bcMask ]
// var enums = values.concat(masks)

// enums.forEach(o => assert(o instanceof Number))
// enums.forEach(o => assert(o instanceof EnumValue))
// enums.forEach(o => assert(o instanceof AbcFlags))

// values.forEach(o => assert(!o.isMask))
// masks.forEach(o => assert(o.isMask))