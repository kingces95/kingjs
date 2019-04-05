var {
  ['@kingjs']: { 
    reflect: { implementInterface },
    rx: { create },
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Next, Complete, Error },
  },
} = require('./dependencies');

var Observable = Symbol('@kingjs/shim.promise.observable');

implementInterface(Promise.prototype, IObservable, {
  subscribe() {

    var observable = this[Observable];
    if (!observable) {
      this[Observable] = observable = create(subject => {
        var canceled;

        this.then(o => {
          if (canceled)
            return;
          subject[Next](o);
          subject[Complete]();
        },
        o => {
          if (canceled)
            return;
          subject[Error](o);
        });

        return () => canceled = true;
      })
    }

    return observable[Subscribe].apply(observable, arguments);
  }
});