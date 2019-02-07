var {
  ['@kingjs']: { 
    reflect: { implementInterface },
    IEnumerable,
  },
} = require('./dependencies');

var IndexableEnumerable = require('./indexable-enumerable');

implementInterface(Array.prototype, IEnumerable, {
  methods: {
    getEnumerator: function() { 
      return new IndexableEnumerable(this); 
    }
  }
});