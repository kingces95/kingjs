# @[kingjs][@kingjs]/[rx][ns0].[log][ns1]
Returns an `IObservable` that logs life-cycle events.
## Usage
```js
require('@kingjs/shim')
var assert = require('assert');
var { Subscribe } = require('@kingjs/i-observable');
var of = require('@kingjs/rx.of');
var Spy = require('@kingjs/rx.log');

var n = 'n';
var c = 'c';
var e = 'e';

var N = 'N';
var C = 'C';
var E = 'E';

var result = [];

of(0, 1)
  [Spy](
    o => result.push(n, o),
    () => result.push(c),
    o => result.push(e, o),
  )
  [Subscribe](
    o => result.push(N, o),
    () => result.push(C),
    o => result.push(E, o),
  );

assert.deepEqual(result, [
  n, 0, N, 0, 
  n, 1, N, 1, 
  c, C
]);
```

## API
```ts
log(this, label[, format])
```

### Parameters
- `this`: The source `IObservable` whose live-cycle events are logged.
- `label`: A label identifying the log.
- `format`: Optional format string to display emitted values.
### Returns
Returns a new `IObservable` that behaves like the source `IObservable`.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.log
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-observable`](https://www.npmjs.com/package/@kingjs/i-observable)|`latest`|
|[`@kingjs/i-observer`](https://www.npmjs.com/package/@kingjs/i-observer)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/reflect.is`](https://www.npmjs.com/package/@kingjs/reflect.is)|`latest`|
|[`@kingjs/rx.create`](https://www.npmjs.com/package/@kingjs/rx.create)|`latest`|
## Source
https://repository.kingjs.net/rx/log
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/log)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.log
