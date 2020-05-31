var { assert,
  '@kingjs': {
    WeakMapByInternedString
  },
} = module[require('@kingjs-module/dependencies')]()

var map = new WeakMapByInternedString()

var value = map.get('foo')
assert.ok(!value)

value = map.set('foo', { answer: 42 })
assert.equal(value.answer, 42)

assert.equal(value, map.get('foo'))