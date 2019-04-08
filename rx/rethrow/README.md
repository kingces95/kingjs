# @[kingjs][@kingjs]/[rx][ns0].[rethrow][ns1]
Returns an `IObservable` that spies on the `error` event.
## Usage
```js
require('@kingjs/shim')
var assert = require('assert');
var { Subscribe } = require('@kingjs/i-observable');
var { Next, Error } = require('@kingjs/i-observer');
var Subject = require('@kingjs/rx.subject');
var Rethrow = require('@kingjs/rx.rethrow');

var e = 'e';

var N = 'N';
var C = 'C';
var E = 'E';

var result = [];

var subject = new Subject();

subject
  [Rethrow](
    o => result.push(e, o),
  )
  [Subscribe](
    o => result.push(N, o),
    () => result.push(C),
    o => result.push(E, o),
  );

subject[Next](0);
subject[Next](1);
subject[Error](2);

assert.deepEqual(result, [
  N, 0, 
  N, 1, 
  e, 2,
  E, 2,
]);
```

## API
```ts
rethrow(this, callback)
```

### Parameters
- `this`: The source `IObservable` whose `error` event is spied upon.
- `callback`: The callback to make when `error` event occurs.
### Returns
Returns a new `IObservable` that behaves like the source `IObservable` modulo any side effects introduced by `callback`.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.rethrow
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/rx.i-observable`](https://www.npmjs.com/package/@kingjs/rx.i-observable)|`latest`|
|[`@kingjs/rx.spy`](https://www.npmjs.com/package/@kingjs/rx.spy)|`latest`|
## Source
https://repository.kingjs.net/rx/rethrow
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/rethrow)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.rethrow
