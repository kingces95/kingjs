var { assert,
  '@kingjs': { 
    IEquatable,
    IEquatable: { Equals, GetHashcode },
    Singleton,
  }
} = module[require('@kingjs-module/dependencies')]()

var EmptyArray = [ ]
var Iterator = Symbol.iterator

function isPrimitiveOrSingleton(key) {
  if (key instanceof Singleton) return true

  var type = typeof(key)
  if (type == 'string') return true
  if (type == 'number') return true
  if (type == 'boolean') return true
  return false
}

class Dictionary {

  initialize(key) {
    if (this.dictionary)
      return this.dictionary

    if (isPrimitiveOrSingleton(key))
      return this.dictionary = new Map()

    assert(key instanceof IEquatable)
    return this.dictionary = new ScanDictionary()
  }

  get size() { return this.dictionary ? this.dictionary.size : 0 }

  get(key) { return this.dictionary ? this.dictionary.get(key) : undefined }
  delete(key) { return this.dictionary ? this.dictionary.delete(key) : undefined }
  has(key) { return this.dictionary ? this.dictionary.has(key) : false }
  set(key, value) { return this.initialize(key).set(key, value) }

  clear() { this.dictionary ? this.dictionary.clear() : undefined }
  keys() { return this.dictionary ? this.dictionary.keys() : EmptyArray }
  values() { return this.dictionary ? this.dictionary.values() : EmptyArray }
  entries() { return this.dictionary ? this.dictionary.entries() : EmptyArray }

  [Iterator]() { return this.dictionary ? this.dictionary[Iterator]() : EmptyArray[Iterator]() }
}

class ScanDictionary {

  constructor() {
    this.clear()
  }

  getIndex(key) {
    assert(key instanceof IEquatable)
    for (var i = 0; i < this.keys_.length; i ++) {
      var keyAtSlot = this.keys_[i]
      if (keyAtSlot === undefined)
        continue

      if (!keyAtSlot[Equals](key))
        continue
        
      assert(key[GetHashcode]() == keyAtSlot[GetHashcode]())
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