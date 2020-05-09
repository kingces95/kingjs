var {
  '@kingjs': { 
    reflect: { implementInterface },
    IEnumerable,
  },
} = module[require('@kingjs-module/dependencies')]()

var IndexableEnumerator = require('./indexable-enumerator')

implementInterface(
  String.prototype, 
  IEnumerable, {
    getEnumerator() { 
      return new IndexableEnumerator(this) 
    }
  }
)