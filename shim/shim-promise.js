var {
  ['@kingjs']: { 
    reflect: { implementInterface },
    IObservable,
    IObserver: { Next, Complete, Error }
  },
} = require('./dependencies');

implementInterface(Promise.prototype, IObservable, {
  subscribe(observer) {
    var canceled; 

    this.then(o => {
      if (canceled)
        return;
      observer[Next](o);
      observer[Complete]();
    },
    o => {
      if (canceled)
        return;
      observer[Error](o);
    });

    return () => canceled = true;
  }
});