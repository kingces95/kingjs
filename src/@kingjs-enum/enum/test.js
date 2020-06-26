var { assert,
  '@kingjs': { 
    '-enum': { 
      Enum, EnumValue,
      '-static': { define },
    }    
   }
} = module[require('@kingjs-module/dependencies')]()

var AbcEnum = define('test', {
  a: 1 << 0,
  b: 1 << 1,
  c: 1 << 2,
  ab: [ 'a', a << 1 ],
  abc: 1 << 0 | 1 << 1 | 1 << 2,
  bc: [ 'b', 'c' ],
  aMask: [ 'a' ],
  abMask: [ 'a', 'b' ],
  bcMsk: { value: [ 'b', 'c' ], isMask: true },
})

var { a, b, c, ab, abc, bc, aMask, abMask, bcMask } = AbcEnum

assert.ok(AbcEnum instanceof Enum)
assert.ok(a instanceof Number)
assert.ok(a instanceof EnumValue)
assert.ok(a instanceof AbcEnum)
assert.ok(a == 1)
assert.ok(a !== 1)
assert.ok(a | 1 === 1)

assert.equal(a, 1 << 0)
assert.equal(b, 1 << 1)
assert.equal(c, 1 << 2)
assert.equal(ab, a | b)
assert.equal(abc, a | b | c)
assert.equal(bc, b | c)
assert.equal(aMask, a)
assert.equal(abMask, a | b)
assert.equal(bcMask, b | c)

var values = [ a, b, c, ab, abc, bc ]
var masks = [ aMask, abMask, bcMask ]
var enums = values.concat(masks)

enums.forEach(o => assert(o instanceof Number))
enums.forEach(o => assert(o instanceof EnumValue))
enums.forEach(o => assert(o instanceof AbcEnum))

values.forEach(o => assert(!o.isMask))
masks.forEach(o => assert(o.isMask))