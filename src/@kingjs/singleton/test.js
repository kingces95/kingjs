var { assert,
  '@kingjs': { 
    IEquatable,
    IEquatable: { Equals, GetHashcode },
    Singleton,
  },
} = module[require('@kingjs-module/dependencies')]()

var singleton = new Singleton()

assert.ok(singleton instanceof IEquatable)
assert.ok(singleton[GetHashcode]())
assert.ok(singleton[Equals](singleton))
assert.ok(!singleton[Equals](new Singleton()))