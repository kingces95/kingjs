var {
  '@kingjs': { 
    reflect: { implementInterface },
    rx: { 
      from,
      IObservable,
      IObservable: { Subscribe }
    },
    IEnumerable,
  },
} = module[require('@kingjs-module/dependencies')]()

var IndexableEnumerator = require('./indexable-enumerator')

implementInterface(
  Array.prototype, 
  IEnumerable, {
    getEnumerator() { 
      return new IndexableEnumerator(this) 
    }
  }
)

implementInterface(
  Array.prototype, 
  IObservable, {
    subscribe() {
      var observable =  from(this)
      return observable[Subscribe].apply(observable, arguments)
    }
  }
)