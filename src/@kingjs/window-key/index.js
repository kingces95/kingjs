var { assert,
  '@kingjs': {
    equal, getHashcode,
    IEquatable: { Equals, GetHashcode },
  }
} = module[require('@kingjs-module/dependencies')]()

class WindowKey {
  constructor(value, previous) {
    this.value = value
    
    if (!previous)
      return

    assert.ok(previous instanceof WindowKey)
    this.previous = previous.value
  }
  [GetHashcode]() { return getHashcode(this.value) }
  [Equals](other) { return equal(this.value, other.value) }

  next(value) { return new WindowKey(value, this) }
}

module.exports = WindowKey