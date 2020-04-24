var { 
  assert
} = require('./dependencies')

class StringBuilder {
  constructor(buffer, parent) {
    this.buffer = buffer
    this.parent = parent
  }

  get __toString() { 
    return this.toString() 
  }

  get hasParent() {
    return !!this.parent
  }

  equals(other) {
    if (this == other)
      return true

    if (!other)
      return false

    if ((other instanceof this.constructor) == false)
      return false

    return this.buffer.equals(other.buffer)
  }

  toString() {
    return this.buffer.toString()
  }
}

module.exports = StringBuilder