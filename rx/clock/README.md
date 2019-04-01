# @[kingjs][@kingjs]/[rx][ns0].[clock][ns1]
Create an `IObservable` that asynchronously emits `Date.now()` endlessly.
## Usage
```js
var assert = require('assert');
var clock = require('@kingjs/rx.clock');
var { Subscribe } = require('@kingjs/i-observable');

async function run() {
  var count = 3;
  var result = [];

  var i = 0;
  await new Promise(resolve => {
    var unsubscribe = clock()[Subscribe](() => {

      // prove values are returned in different clock ticks
      process.nextTick(() => result.push(null));

      result.push(i++);

      if (i == count) {
        resolve();
        unsubscribe();
      }
    }, resolve);
  })

  assert.deepEqual(result, [0, null, 1, null, 2])
}
run();
```

## API
```ts
clock([timeOut])
```

### Parameters
- `timeOut`: A function that returns the time to wait in milliseconds before the next emission.
### Returns
A function which can be called to cancel the emission of values.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.clock
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/endless`](https://www.npmjs.com/package/@kingjs/endless)|`latest`|
|[`@kingjs/i-observer`](https://www.npmjs.com/package/@kingjs/i-observer)|`latest`|
|[`@kingjs/promise.sleep`](https://www.npmjs.com/package/@kingjs/promise.sleep)|`latest`|
|[`@kingjs/rx.create`](https://www.npmjs.com/package/@kingjs/rx.create)|`latest`|
## Source
https://repository.kingjs.net/rx/clock
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/clock)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.clock
