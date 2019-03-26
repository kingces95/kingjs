# @[kingjs][@kingjs]/[rx][ns0].[create][ns1]
Create an `IObservable` that, once per tick per `interval`, invokes `callback` with a `next` function to call with the next value to emit.
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
create(callback(this, next)[, interval])
```

### Parameters
- `callback`: Invoked when a value is scheduled to be emitted.
  - `this`: A context that is preserved between callbacks.
  - `next`: A function called with the next value to emit.
  - A boolean promise of `false` if values have been exhausted or `true`if more values are available.
- `interval`: The time between emissions, or a function or  generator that returns the time until the next emission.
### Returns
A function which can be called to cancel the emission of values.
### Remarks
 - The `callback` may be an `async` function.
 - The first emission happens after an interval has elapsed and on the next tick at the earliest.
 - The observable automatically emits  `complete` when the `callback` returns false.
 - The observable automatically emits  `error` with any exception thrown from `callback`.
 - Values emitted after a generator `interval` has been exhausted will be emitted once per tick.
 - `callback` may be a generator or an async generator in which case value to emit are pulled from the generator on a schedule specified by `interval` until the generator is exhausted or throws an exception.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.create
```
## Dependencies
|Package|Version|
|---|---|
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
