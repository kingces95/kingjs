var privateField = {
  configurable: false,
  enumerable: false,
  writable: false
};

function ArrayEnumerator(array) {
  this.array_ = array;
  Object.defineProperty(this, 'array_', privateField);

  this.index_ = -1;
  this.current_ = undefined;
}
Object.defineProperties(ArrayEnumerator.prototype, {
  index_: {
    value: -1,
    writable: true
  },
  current_: { 
    writable: true
  },
  current: {
    get: function() { 
      return this.current_; 
    }
  },
  moveNext: {
    value: function() {
      var array = this.array_;
      var index = this.index_ + 1;
      if (index == array.length) {
        this.current_ = undefined;
        return false;
      }

      this.current_ = array[index];
      this.index_ = index;
      return true;
    }
  }
})

function getEnumerator() {
  Object.freeze(this);
  return new ArrayEnumerator(this);
} 

function makeEnumerable() {
  if ('getEnumerator' in this)
    return this;

  this.getEnumerator = getEnumerator;
  Object.defineProperty(this, 'getEnumerator', privateField);
  return this;
}

Object.defineProperties(module, {
  exports: { value: makeEnumerable }
});