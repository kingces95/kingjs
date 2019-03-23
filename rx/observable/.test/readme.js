var assert = require('assert');
var Observable = require('..');

class DataSource {
  constructor() {
    let i = 0;
    this._id = setInterval(() => this.emit(i++), 200);
  }
  
  emit(n) {
    const limit = 10;
    if (this.onData) {
      this.onData(n);
    }
    if (n === limit) {
      if (this.oncomplete) {
        this.onComplete();
      }
      this.destroy();
    }
  }
  
  destroy() {
    console.log('destroy')
    clearInterval(this._id);
  }
}


/**
 * our observable
 */
const myObservable = new Observable((observer) => {
  const dataSource = new DataSource();
  dataSource.onData = (e) => observer.next(e);
  dataSource.onError = (err) => observer.error(err);
  dataSource.onComplete = () => observer.complete();

  return dataSource.destroy.bind(dataSource);
})


/**
 * now let's use it
 */
const unsub = myObservable.subscribe({
  next(x) { console.log(x); },
  error(err) { console.error(err); },
  complete() { console.log('done')}
});

/**
 * uncomment to try out unsubscription
 */
setTimeout(() => {
  console.log('timeout')
  unsub()
}, 1000);