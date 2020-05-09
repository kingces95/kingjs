var {
  '@kingjs': { 
    reflect: { implementInterface },
    IEnumerator
  },
} = module[require('@kingjs-module/dependencies')]()

class IndexableEnumerator {
  constructor(indexable) {
    this.indexable_ = indexable
    this.index_ = -1
  }
}

implementInterface(
  IndexableEnumerator.prototype, 
  IEnumerator, {
    get current() { 
      return this.current_ 
    },
    moveNext() {
      var indexable = this.indexable_
      var index = this.index_ + 1
      if (index == indexable.length) {
        this.current_ = undefined
        return false
      }
    
      this.current_ = indexable[index]
      this.index_ = index
      return true
    }
  }
)

module.exports = IndexableEnumerator