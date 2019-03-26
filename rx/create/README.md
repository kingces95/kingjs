# @[kingjs][@kingjs]/[rx][ns0].[create][ns1]
Create an `IObservable` that asynchronously emits values.
## Usage
```js
var assert = require('assert');
var create = require('@kingjs/rx.create');
var { Subscribe } = require('@kingjs/i-observable');

async function run() {
  var count = 3;
  var result = [];

  await new Promise(resolve => {
    new create(function(next) {

      if (!this.i)
        this.i = 0;

      // prove values are returned in different clock ticks
      process.nextTick(() => result.push(null));
      
      if (this.i == count)
        return false;

      next(this.i++);
      return true;
    })[Subscribe](o => result.push(o), resolve);
  })

  assert.deepEqual(result, [0, null, 1, null, 2, null])
}
run();
```

## API
```ts
create(callback(this, next)[, timeOut])
```

### Parameters
- `callback`: Invoked when a value is scheduled to be emitted.
  - `this`: A context that is preserved between callbacks.
  - `next`: A function called with the value to emit.
  - Returns`true` if more values are available for emission, else 'false'.
- `timeOut`: A function that returns the time to wait in milliseconds before the next emission.
### Returns
A function which can be called to cancel the emission of values.
### Remarks
 - Both `callback` may return promises.
 - At most one value is emitted per event loop.
 - The first emission happens
   - after the timeOut has elapsed.
   - on the next tick at the earliest.
 - The observable automatically emits `complete` when the `callback` returns false.
 - The observable automatically emits `error` with any exception thrown from `callback`.
 - If `callback` is a generator (or an async generator) then
   - the next value to emit is pulled from the generator
   - emission stops when the generator is exhausted (or throws).

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.create
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/endless`](https://www.npmjs.com/package/@kingjs/endless)|`latest`|
|[`@kingjs/i-observer`](https://www.npmjs.com/package/@kingjs/i-observer)|`latest`|
|[`@kingjs/promise.sleep`](https://www.npmjs.com/package/@kingjs/promise.sleep)|`latest`|
|[`@kingjs/reflect.is`](https://www.npmjs.com/package/@kingjs/reflect.is)|`latest`|
|[`@kingjs/rx.subject`](https://www.npmjs.com/package/@kingjs/rx.subject)|`latest`|
## Source
https://repository.kingjs.net/rx/create
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/create)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.create
