# @[kingjs][@kingjs]/[rx][ns0].[capture][ns1]
Returns an `IObservable` that emits values from the source `IObservable` unless and until it emits  an error at which point it emits values from a provided  another `IObservable`.
## Usage
```js
require('@kingjs/shim')
var assert = require('assert');
var timer = require('@kingjs/rx.timer');
var fail = require('@kingjs/rx.fail');
var Then = require('@kingjs/rx.then');
var Capture = require('@kingjs/rx.capture');

var E = 'E';

async function run() {

  // timer + Then = an asynchronous multicast operator
  timer()
    [Then](fail(E))
    [Capture](e => {
      assert(e == E);
      return of(0, 1)
    });
}
run();
```

## API
```ts
capture(this[, value])
```

### Parameters
- `this`: The source `IObservable`.
- `value`: The `IObservable` to emit after the source  `IObservable` emits an error. May also be a function that, given the exception, returns the `IObservable`.  If omitted, then the error is swallowed and a `complete`  is emitted.
### Returns
Returns a new `IObservable` that emits the values of one `IObservable` followed by another `IObservable` if and when the first emits an error.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.capture
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-observable`](https://www.npmjs.com/package/@kingjs/i-observable)|`latest`|
|[`@kingjs/i-observer`](https://www.npmjs.com/package/@kingjs/i-observer)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/reflect.is`](https://www.npmjs.com/package/@kingjs/reflect.is)|`latest`|
|[`@kingjs/rx.create`](https://www.npmjs.com/package/@kingjs/rx.create)|`latest`|
|[`@kingjs/rx.subject`](https://www.npmjs.com/package/@kingjs/rx.subject)|`latest`|
## Source
https://repository.kingjs.net/rx/capture
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/capture)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.capture
