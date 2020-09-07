var {
  '@kingjs': { equal, getHashcode,
    IEqualityComparer: { Equals, GetHashcode }, 
  }
} = module[require('@kingjs-module/dependencies')]()

var Zero = () => 0

class EqualityComparer {
  static createUsingKeySelector(selector) {
    return new EqualityComparer(
      (l, r) => equal(selector(l), selector(r)),
      o => getHashcode(selector(o))
    )
  }

  constructor(equal, getHashcode = Zero) {
    this.equal = equal
    this.getHashcode = getHashcode
  }

  [Equals](l, r) { return this.equal(l, r) }
  [GetHashcode](o) { return this.getHashcode(o) }
}

EqualityComparer.default = new EqualityComparer(equal, getHashcode)

module.exports = EqualityComparer