# @[kingjs][@kingjs]/[rx][ns0].[do][ns1]
Returns an `IObservable` that spies on life-cycle events.
## Usage
```js
require('@kingjs/shim')
var assert = require('assert');
var { Subscribe } = require('@kingjs/i-observable');
var of = require('@kingjs/rx.of');
var Spy = require('@kingjs/rx.do');

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
_do(this, next[, complete[, error]])
```

### Parameters
- `this`: The source `IObservable` whose live-cycle events are spied upon.
- `next`: An `IObserver` that spies on the life-cycle events and their corresponding values or the `next` function of such an `IObserver`.
- `complete`: If `next` is a function, this may be the `complete` function of the `IObserver`
- `error`: If `next` is a function, this may be the `error` function of the `IObserver`
### Returns
Returns a new `IObservable` that behaves like the source `IObservable` modulo any side effects introduced by the `observer`.
### Remarks
Like `subscribe` except instead of returning a disposable  function, another `IObservable` is returned.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.do
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
https://repository.kingjs.net/rx/do
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/do)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.do
