var { assert,
  '@kingjs': { 
    EmptyObject,
    EqualityComparer,
    IEqualityComparer,
    IEqualityComparer: { Equals, GetHashcode },
  }
} = module[require('@kingjs-module/dependencies')]()

var Iterator = Symbol.iterator

class Dictionary {
  constructor(options = EmptyObject) {
    var { comparer = EqualityComparer } = options
    assert(comparer instanceof IEqualityComparer)
    this.comparer = comparer

    this.clear()
  }

  getIndex(key) {
    var { comparer } = this

    // TODO: Actually implement instead of scanning
    for (var i = 0; i < this.keys_.length; i ++) {
      var keyAtSlot = this.keys_[i]
      if (keyAtSlot === undefined)
        continue

      if (!comparer[Equals](keyAtSlot, key))
        continue
        
      assert.equal(
        comparer[GetHashcode](key), 
        comparer[GetHashcode](keyAtSlot)
      )

      return i
    }

    return -1
  }

  get(key) {
    var index = this.getIndex(key)
    return this.values_[index]
  }

  has(key) { 
    return this.getIndex(key) != -1
  }

  delete(key) {
    var index = this.getIndex(key)
    if (index == -1)
      return false

    this.keys_[index] = undefined
    this.values_[index] = undefined
    this.size--
    return true
  }

  set(key, value) {
    var index = this.getIndex(key)

    // overwrite existing slot
    if (index !== -1) {
      this.keys_[index] = key
      this.values_[index] = value
      return value
    }

    this.keys_.push(key)
    this.values_.push(value)
    this.size++
    return value
  }

  clear() {
    this.keys_ = []
    this.values_ = []
    this.size = 0
  }
  
  keys() { return this.keys_.filter(o => o) }
  values() { return this.values_.filter(o => o) }
  entries() { 
    return Array.prototype.map.call(this.keys(), (o, i) => [ 
      o, this.values_[i] 
    ])
  }

  [Iterator]() { return this.entries()[Iterator]() }
}

module.exports = Dictionary