var {
  ['@kingjs']: { 
    reflect: { implementInterface },
    IEnumerable,
  },
} = module[require('@kingjs-module/dependencies')]();

var IndexableEnumerable = require('./indexable-enumerable');

implementInterface(String.prototype, IEnumerable, {
  getEnumerator() { 
    return new IndexableEnumerable(this); 
  }
});