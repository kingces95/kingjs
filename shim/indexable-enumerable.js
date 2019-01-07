var DefineInterfaceOn = require('./define-interface-on');

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

IEnumerator[DefineInterfaceOn](prototype, {
  Current: {
    get: function() { return this.current_; }
  },
  MoveNext: function() {
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
})

module.exports = IndexableEnumerable;