var {
  '@kingjs': { lessThan,
    EqualityComparer,
    IEqualityComparer: { Equals, GetHashcode },
    IComparer: { IsLessThan }, 
  }
} = module[require('@kingjs-module/dependencies')]()

function Zero() { return 0 }

class Comparer {
  static createUsingKeySelector(selector) {
    return new Comparer(
      (l, r) => lessThan(selector(l), selector(r)),
      EqualityComparer.createUsingKeySelector(selector)
    )
  }
  
  constructor(isLessThan, equalityComparer) {
    if (!equalityComparer) {
      equalityComparer = new EqualityComparer(
        (l, r) => !isLessThan(l, r) && !isLessThan(r, l), Zero
      )
    }

    this.isLessThan = isLessThan
    this.equalityComparer = equalityComparer
  }

  [IsLessThan](l, r) { return this.isLessThan(l, r) }
  [Equals](l, r) { return this.equalityComparer[Equals](l, r) }
  [GetHashcode](o) { return this.equalityComparer[GetHashcode](o) }
}

Comparer.default = new Comparer(lessThan, EqualityComparer.default)

module.exports = Comparer