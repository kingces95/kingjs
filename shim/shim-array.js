var {
  ['@kingjs']: { 
    reflect: { implementInterface },
    linq: { ToObservable },
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
    var observable =  [...this][ToObservable]();
    return observable[Subscribe].apply(observable, arguments);
  }
});