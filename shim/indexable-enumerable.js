
var {
  IEnumerator: { MoveNext, Current },
} = Symbol.kingjs;

function IndexableEnumerable(indexable) { 
  this.indexable_ = indexable 
}

var prototype = IndexableEnumerable.prototype;
prototype.index_ = -1;
prototype.current_ = undefined;
prototype.current_ = undefined;

Object.defineProperty(
  prototype,
  Current, {
    get: function() { return this.current_; }
  }
);

prototype[MoveNext] = function() {
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

module.exports = IndexableEnumerable;