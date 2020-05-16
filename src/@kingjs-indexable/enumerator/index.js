var {
  '@kingjs': { IEnumerator },
} = module[require('@kingjs-module/dependencies')]()

class Enumerator {
  constructor(indexable) {
    this.indexable = indexable
    this.index = -1
  }

  get [IEnumerator.Current]() {
    return this.current 
  }

  [IEnumerator.MoveNext]() {
    var { index, indexable } = this

    index++

    if (index == indexable.length) {
      this.current = undefined
      return false
    }
  
    this.current = indexable[index]
    this.index = index
    return true
  }
}

module.exports = Enumerator