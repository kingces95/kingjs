# @[kingjs][@kingjs]/[promise][ns0].[to-observable][ns1]
Turns a promise into an IObservable that emits the resolved value followed by `complete` or `error` if the promise throws.
## Usage
```js
var assert = require('assert');
var ToObservable = require('@kingjs/promise.to-observable');
var { Subscribe } = require('@kingjs/rx.i-observable')

var promise = new Promise(resolve => {
  setTimeout(() => {
    resolve();
  });
})

var next, complete;

promise
  [ToObservable]()
  [Subscribe](
    o => next = true,
    o => complete = true
  );

setTimeout(() => {
  assert(next);
  assert(complete);
})
```

## API
```ts
toObservable(this)
```

### Parameters
- `this`: The promise.
### Returns
Returns an `IObservable`.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/promise.to-observable
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/rx.create`](https://www.npmjs.com/package/@kingjs/rx.create)|`latest`|
|[`@kingjs/rx.i-observable`](https://www.npmjs.com/package/@kingjs/rx.i-observable)|`latest`|
|[`@kingjs/rx.i-observer`](https://www.npmjs.com/package/@kingjs/rx.i-observer)|`latest`|
## Source
https://repository.kingjs.net/promise/to-observable
## License
MIT

![Analytics](https://analytics.kingjs.net/promise/to-observable)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/promise
[ns1]: https://www.npmjs.com/package/@kingjs/promise.to-observable
