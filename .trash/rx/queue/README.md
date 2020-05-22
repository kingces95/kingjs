# @[kingjs][@kingjs]/[rx][ns0].[queue][ns1]
Returns an `IObservable` that asynchronously maps  values emitted from the current `IObservable`.
## Usage
```js
var assert = require('assert');
var { Subscribe } = require('@kingjs/rx.i-observable');
var of = require('@kingjs/rx.of');
var Queue = require('@kingjs/rx.queue');

async function run() {
  var result = [];

  await new Promise((resolve) => {
    of(0, 1, 2)
      [Queue](async o => await o + 1)
      [Subscribe](
        o => result.push(o),
        resolve,
      );
  });

  assert.deepEqual(result, [1, 2, 3]);
}
run();
```

## API
```ts
queue(this, callback)
```

### Parameters
- `this`: The source `IObservable` whose emitted value are mapped.
- `callback`: An async function that maps each emitted value.
### Returns
Returns a new `IObservable` that emits mapped values.
### Remarks
 - `error` and `complete` events are delivered after all `next` events have been drained.
 - Selection tasks are serialized.
 - One pending selection task is queued.
 - The pending selection task is replaced by more recent observations.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.queue
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/array.remove`](https://www.npmjs.com/package/@kingjs/array.remove)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/rx.create`](https://www.npmjs.com/package/@kingjs/rx.create)|`latest`|
|[`@kingjs/rx.i-observable`](https://www.npmjs.com/package/@kingjs/rx.i-observable)|`latest`|
|[`@kingjs/rx.i-observer`](https://www.npmjs.com/package/@kingjs/rx.i-observer)|`latest`|
|[`@kingjs/task-pool`](https://www.npmjs.com/package/@kingjs/task-pool)|`latest`|
## Source
https://repository.kingjs.net/rx/queue
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/queue)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.queue
