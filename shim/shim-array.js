var {
  ['@kingjs']: { 
    reflect: { implementInterface },
    rx: { from },
    IEnumerable,
    IObservable,
    IObservable: { Subscribe }
  },
} = require('./dependencies');

var IndexableEnumerable = require('./indexable-enumerable');

implementInterface(Array.prototype, IEnumerable, {
  getEnumerator() { 
    return new IndexableEnumerable(this); 
  }
});

implementInterface(Array.prototype, IObservable, {
  subscribe() {
    var observable =  from(this);
    return observable[Subscribe].apply(observable, arguments);
  }
});