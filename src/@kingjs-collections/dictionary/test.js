var { assert,
  '@kingjs': { 
    IEquatable: { Equals, GetHashcode },
    '-collections': { Dictionary },
    '-string': { GetHashcode: GetStringHashcode }
  }
} = module[require('@kingjs-module/dependencies')]()

var Iterator = Symbol.iterator

class Key {
  constructor(name, type) {
    this.name = name
    this.type = type
  }

  [Equals](other) {
    if (!other || !(other instanceof Key))
      return false

    return this.name == other.name && this.type == other.type
  }

  [GetHashcode]() {
    if (this.hashcode === undefined) {
      Object.defineProperty(this, 'hashcode', {
        value: this.name[GetStringHashcode]() ^ 
          this.type[GetStringHashcode]()
      })
    }

    return this.hashcode
  }
}

function test(key, otherKey) {
  var dictionary = new Dictionary()

  dictionary.clear()
  assert.ok(dictionary[Iterator]().next().done)
  assert.ok(dictionary.keys()[Iterator]().next().done)
  assert.ok(dictionary.values()[Iterator]().next().done)
  assert.ok(dictionary.entries()[Iterator]().next().done)

  assert.equal(dictionary.size, 0)
  assert.ok(!dictionary.has(key()))
  assert.ok(!dictionary.delete(key))
  assert.equal(dictionary.get(key()), undefined)
  assert.equal(dictionary.keys().length, 0)
  assert.equal(dictionary.values().length, 0)
  assert.equal(dictionary.entries().length, 0)

  var value = { }
  for (var i = 0; i < 2; i++) {
    dictionary.set(key(), value)
    assert.equal(dictionary.size, 1)
    assert.ok(dictionary.has(key()))
    assert.equal(value, dictionary.get(key()))
  }

  assert.deepEqual(dictionary.keys()[Iterator]().next().value, key())
  assert.deepEqual(dictionary.values()[Iterator]().next().value, value)
  assert.deepEqual(dictionary.entries()[Iterator]().next().value, [ key(), value ])
  assert.deepEqual(dictionary[Iterator]().next().value, [ key(), value ])

  assert.ok(dictionary.delete(key()))
  assert.equal(dictionary.size, 0)
  assert.ok(!dictionary.delete(key()))

  dictionary.set(key(), value)
  dictionary.clear()
  assert.equal(dictionary.size, 0)

  dictionary.set(key(), value)
  dictionary.set(otherKey(), value)
  assert.ok(dictionary.has(key()))
  assert.ok(dictionary.has(otherKey()))
  assert.equal(dictionary.size, 2)

  dictionary.delete(otherKey())
  assert.ok(dictionary.has(key()))
  assert.ok(!dictionary.has(otherKey()))
  assert.equal(dictionary.size, 1)
}

test(() => new Key('foo', 'bar'), () => new Key('Foo', 'Bar'))
test(() => 'foo', () => 'bar')
test(() => 42, () => 52)
test(() => true, () => false)
