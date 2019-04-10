# @[kingjs][@kingjs]/[rx][ns0].[select][ns1]
Returns an `IObservable` that maps values emitted from the current `IObservable`.
## Usage
```js
var assert = require('assert');
var { Subscribe } = require('@kingjs/rx.i-observable');
var of = require('@kingjs/rx.of');
var Select = require('@kingjs/rx.select');
var Then = require('@kingjs/rx.then');
var never = require('@kingjs/rx.never');
var Async = require('@kingjs/rx.next-tick-scheduler');
var timer = require('@kingjs/rx.timer');

async function run() {
  var result = [];
  await new Promise((resolve) => {
    of(0)
      [Select](o => o + 1)
      [Subscribe](
        o => result.push(o),
        resolve,
      );
  });

  assert.deepEqual(result, [1]);
}
run();

async function runAsync() {
  var result;
  await new Promise((resolve) => {
    var dispose = timer()
      [Then](of(0))
      [Then](never())
      [Select]( 
        async o => result = await Promise.resolve(o + 1), 
      Async)
      [Subscribe](
        o => { result = o; dispose(); resolve() },
      );
  })

  assert(result == 1);
}
//runAsync();
```

## API
```ts
select(this, callback[, scheduler])
```

### Parameters
- `this`: The source `IObservable` whose emitted value are mapped.
- `callback`: The function that maps each emitted value.
- `scheduler`: The `IScheduler` to used to schedule `next` emissions.
### Returns
Returns a new `IObservable` that emits mapped values.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.select
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/rx.create`](https://www.npmjs.com/package/@kingjs/rx.create)|`latest`|
|[`@kingjs/rx.default-scheduler`](https://www.npmjs.com/package/@kingjs/rx.default-scheduler)|`latest`|
|[`@kingjs/rx.i-observable`](https://www.npmjs.com/package/@kingjs/rx.i-observable)|`latest`|
|[`@kingjs/rx.i-observer`](https://www.npmjs.com/package/@kingjs/rx.i-observer)|`latest`|
|[`@kingjs/rx.i-scheduler`](https://www.npmjs.com/package/@kingjs/rx.i-scheduler)|`latest`|
## Source
https://repository.kingjs.net/rx/select
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/select)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.select
