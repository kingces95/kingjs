var {
  ['@kingjs']: { 
    reflect: { implementInterface },
    IEnumerable,
  },
} = require('./dependencies');

var IndexableEnumerable = require('./indexable-enumerable');

implementInterface(Array.prototype, IEnumerable, {
  getEnumerator() { 
    return new IndexableEnumerable(this); 
  }
});