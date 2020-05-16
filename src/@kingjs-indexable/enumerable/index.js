var {
  '@kingjs': { IEnumerable,
    '-indexable': { Enumerator }
  },
} = module[require('@kingjs-module/dependencies')]()

class Enumerable {
  constructor(indexable) {
    this.indexable = indexable
  }

  [IEnumerable.GetEnumerator]() {
    return new Enumerator(this.indexable)
  }
}

module.exports = Enumerable