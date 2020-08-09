var { assert,
  '@kingjs': {
    'IEquatable': { Equals, GetHashcode },
    'IComparable': { IsLessThan },
    '-buffer': { Append, GetHashcode: GetBufferHashcode },
    '-reflect': { isString },
  },
} = module[require('@kingjs-module/dependencies')]()

var NonEnumerable = { writable: true }

var Empty = null
var EmptyString = ''

class StringBuilder {
  static get empty() {
    if (!Empty)
      Empty = new StringBuilder(EmptyString)
    return Empty
  } 

  constructor(value) {
    this._buffer = Buffer.from(value)

    Object.defineProperties(this, { 
      _buffer: NonEnumerable,
      _hashcode: NonEnumerable,
    })
  }

  append() {
    var args = [...arguments].map(o => o instanceof StringBuilder ? o._buffer : o)
    return new StringBuilder(this._buffer[Append](...args))
  }

  get __toString() { 
    return this.toString() 
  }

  get buffer() {
    return this._buffer
  }

  [Equals](other) {
    return other instanceof Buffer && this.buffer.compare(other._buffer) == 1
  }

  [GetHashcode]() {
    var hashcode = this._hashcode
    if (!hashcode)
      this._hashcode = hashcode = this.buffer[GetBufferHashcode]()
    return hashcode
  }

  [IsLessThan](other) { 
    assert.ok(other instanceof StringBuilder)
    return this._buffer.compare(other._buffer) == -1
  }

  toString() {
    return this._buffer.toString()
  }
}

module.exports = StringBuilder