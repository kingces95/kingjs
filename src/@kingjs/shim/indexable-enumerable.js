var {
  '@kingjs': { 
    reflect: { implementInterface },
    IEnumerator
  },
} = module[require('@kingjs-module/dependencies')]();

function IndexableEnumerable(indexable) { 
  this.indexable_ = indexable;
  this.index_ = -1;
}

var prototype = IndexableEnumerable.prototype;
prototype.index_ = undefined;
prototype.current_ = undefined;

implementInterface(prototype, IEnumerator, {
  get current() { return this.current_; },
  moveNext() {
    var indexable = this.indexable_;
    var index = this.index_ + 1;
    if (index == indexable.length) {
      this.current_ = undefined;
      return false;
    }
  
    this.current_ = indexable[index];
    this.index_ = index;
    return true;
  }
});

module.exports = IndexableEnumerable;