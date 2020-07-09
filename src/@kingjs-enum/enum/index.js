var { assert,
  '@kingjs': {
    IEquatable: { Equals, GetHashcode },
    IComparable: { IsLessThan },
  }
} = module[require('@kingjs-module/dependencies')]()

class Enum extends Number {

  constructor(value, name) {
    super(value)

    this.name = name
  }

  [IsLessThan](other) {
    assert(other instanceof this.constructor)
    return this < other
  }

  [Equals](other) {
    if (!(other instanceof this.constructor))
      return false

    return this == other
  }

  [GetHashcode]() {
    return this.valueOf()
  }

  toString() {
    return this.name
  }
}

module.exports = Enum