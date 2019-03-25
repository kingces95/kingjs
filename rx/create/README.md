# @[kingjs][@kingjs]/[rx][ns0].[create][ns1]
The description.
## Usage
```js
var assert = require('assert');
var Observable = require('@kingjs/rx.create');
var { Next, Complete, Error } = require('@kingjs/i-observer');

class DataSource {
  constructor() {
    let i = 0;
    this.id = setInterval(() => this.emit(i++), 200);
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
    clearInterval(this.id);
  }
}

var myObservable = new Observable((observer) => {
  const dataSource = new DataSource();
  dataSource.onData = (e) => observer[Next](e);
  dataSource.onError = (err) => observer[Error](err);
  dataSource.onComplete = () => observer[Complete]();

  return dataSource.destroy.bind(dataSource);
})

var dispose = myObservable.subscribe({
  [Next](x) { console.log(x); },
  [Error](err) { console.error(err); },
  [Complete]() { console.log('done')}
});

setTimeout(() => {
  console.log('timeout')
  dispose()
}, 1000);
```






## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.create
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/rx.subject`](https://www.npmjs.com/package/@kingjs/rx.subject)|`latest`|
## Source
https://repository.kingjs.net/rx/create
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/create)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.create
