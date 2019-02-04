var {
  ['@kingjs']: { implementInterface },
} = require('./dependencies');

var IndexableEnumerable = require('./indexable-enumerable');

var { 
  IEnumerable
} = Symbol.kingjs;

implementInterface(Array.prototype, IEnumerable, {
  methods: {
    getEnumerator: function() { 
      return new IndexableEnumerable(this); 
    }
  }
});