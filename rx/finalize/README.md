# @[kingjs][@kingjs]/[rx][ns0].[finalize][ns1]
Returns an `IObservable` that spies on the `complete` and `error` events.
## Usage
```js
require('@kingjs/shim')
var assert = require('assert');
var { Subscribe } = require('@kingjs/rx.i-observable');
var of = require('@kingjs/rx.of');
var fail = require('@kingjs/rx.fail');
var Finalize = require('@kingjs/rx.finalize');

var f = 'f';

var N = 'N';
var C = 'C';
var E = 'E';

var result = [];
of(0, 1)
  [Finalize](
    () => result.push(f),
  )
  [Subscribe](
    o => result.push(N, o),
    () => result.push(C),
    o => result.push(o),
  );

assert.deepEqual(result, [
  N, 0, 
  N, 1, 
  f, C
]);

var result = [];
fail(E)
  [Finalize](
    () => result.push(f)
  )
  [Subscribe](
    o => result.push(N, o),
    () => result.push(C),
    o => result.push(o),
  );
  assert.deepEqual(result, [
    f, E
  ]);
```

## API
```ts
finalize(this, callback)
```

### Parameters
- `this`: The source `IObservable` whose `complete` and `error` events are spied upon.
- `callback`: The callback to make when `complete` or `error` event occurs.
### Returns
Returns a new `IObservable` that behaves like the source `IObservable` modulo any side effects introduced by `callback`.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.finalize
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/rx.do`](https://www.npmjs.com/package/@kingjs/rx.do)|`latest`|
|[`@kingjs/rx.i-observable`](https://www.npmjs.com/package/@kingjs/rx.i-observable)|`latest`|
## Source
https://repository.kingjs.net/rx/finalize
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/finalize)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.finalize
