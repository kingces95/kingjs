# @[kingjs][@kingjs]/[rx][ns0].[subject][ns1]
The Subject.
## Usage
```js
var assert = require('assert');
var Subject = require('@kingjs/rx.subject');
var { Subscribe } = require('@kingjs/i-observable');
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

var myObservable = new Subject((observer) => {
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




### Remarks
 - All `IObservable`s are `Subject`s
 - All `Subject`s are ref-counted. When the last subscription is removed, the `Subject` disposes itself.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.subject
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-observable`](https://www.npmjs.com/package/@kingjs/i-observable)|`latest`|
|[`@kingjs/i-observer`](https://www.npmjs.com/package/@kingjs/i-observer)|`latest`|
|[`@kingjs/reflect.is`](https://www.npmjs.com/package/@kingjs/reflect.is)|`latest`|
## Source
https://repository.kingjs.net/rx/subject
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/subject)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.subject
