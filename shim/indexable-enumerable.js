var {
  '@kingjs/implement-interface': implementInterface,
} = require('@kingjs/require-packages').call(module);

var {
  IEnumerator,
} = Symbol.kingjs;

function IndexableEnumerable(indexable) { 
  this.indexable_ = indexable;
  this.index_ = -1;
}

var prototype = IndexableEnumerable.prototype;
prototype.index_ = undefined;
prototype.current_ = undefined;

implementInterface(prototype, IEnumerator, {
  current: {
    get: 'this.current_'
  },
  moveNext: {
    value: function() {
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
  }
});

module.exports = IndexableEnumerable;