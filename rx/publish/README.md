# @[kingjs][@kingjs]/[rx][ns0].[publish][ns1]
Returns an `IPublishedObservable` that saves its last  observed value and will emit that value to any new subscribers.
## Usage
```js
require('@kingjs/shim')
var assert = require('assert');
var Subject = require('@kingjs/rx.subject');
var Select = require('@kingjs/rx.select');
var Publish = require('@kingjs/rx.publish');
var { Subscribe } = require('@kingjs/rx.i-observable');
var { Next, Complete } = require('@kingjs/rx.i-observer')
var { Value } = require('@kingjs/rx.i-published-observable');

var N = 'N';
var C = 'C';
var E = 'E';

var result = [];

var subject = new Subject()
var addOne = subject[Select](o => o + 1)

var behavior = addOne[Publish]();
behavior[Subscribe]();
assert(behavior[Value] === undefined);

subject[Next](0);
assert(behavior[Value] == 1);

behavior
  [Subscribe](
    o => result.push(N, o),
    () => result.push(C),
    o => result.push(E, o),
  );

subject[Complete]();
assert.deepEqual(result, [
  N, 1, C
]);
```

## API
```ts
publish(this, initialValue)
```

### Parameters
- `this`: The source `IObservable`.
- `initialValue`: A value to emit to subscribers before any values have been observed.
### Returns
Returns an `IPublishedObservable` that emits the last observed  value to new subscribers.
### Remarks
If the subscription occurs after completion then the last observed value is *not* emitted.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.publish
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/reflect.is`](https://www.npmjs.com/package/@kingjs/reflect.is)|`latest`|
|[`@kingjs/rx.create`](https://www.npmjs.com/package/@kingjs/rx.create)|`latest`|
|[`@kingjs/rx.i-observable`](https://www.npmjs.com/package/@kingjs/rx.i-observable)|`latest`|
|[`@kingjs/rx.i-observer`](https://www.npmjs.com/package/@kingjs/rx.i-observer)|`latest`|
|[`@kingjs/rx.i-published-observable`](https://www.npmjs.com/package/@kingjs/rx.i-published-observable)|`latest`|
|[`@kingjs/rx.subject`](https://www.npmjs.com/package/@kingjs/rx.subject)|`latest`|
## Source
https://repository.kingjs.net/rx/publish
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/publish)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.publish
