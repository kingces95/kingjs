# @[kingjs][@kingjs]/[rx][ns0].[never][ns1]
Returns an `IObservable` that emits no events yet keeps the process alive until disposed.
## Usage
```js
var assert = require('assert');
var create = require('@kingjs/rx.never');
var { Subscribe } = require('@kingjs/rx.i-observable');
var { Next, Complete, Error } = require('@kingjs/rx.i-observer');

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

var myObservable = create((observer) => {
  const dataSource = new DataSource();
  dataSource.onData = (e) => observer[Next](e);
  dataSource.onError = (err) => observer[Error](err);
  dataSource.onComplete = () => observer[Complete]();

  return dataSource.destroy.bind(dataSource);
})

var dispose = myObservable[Subscribe]({
  [Next](x) { console.log(x); },
  [Error](err) { console.error(err); },
  [Complete]() { console.log('done')}
});

setTimeout(() => {
  console.log('timeout')
  dispose()
}, 1000);
```

## API
```ts
never()
```




## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.never
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/promise.sleep`](https://www.npmjs.com/package/@kingjs/promise.sleep)|`latest`|
|[`@kingjs/rx.create`](https://www.npmjs.com/package/@kingjs/rx.create)|`latest`|
## Source
https://repository.kingjs.net/rx/never
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/never)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.never
