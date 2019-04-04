# @[kingjs][@kingjs]/[rx][ns0].[timer][ns1]
Create an `IObservable` that waits for `timeOut` milliseconds and then emits `completed`.
## Usage
```js
var assert = require('assert');
var timer = require('@kingjs/rx.timer');
var { Subscribe } = require('@kingjs/i-observable');

async function run() {
  var result = [];

  // prove values are returned in different clock ticks
  process.nextTick(() => result.push(null));

  var i = 0;
  await new Promise(resolve => {
    timer()[Subscribe](assert.fail, () => {
      result.push(0);
      resolve();
    });
  })

  assert.deepEqual(result, [null, 0])
}
run();
```

## API
```ts
timer([timeOut])
```

### Parameters
- `timeOut`: The milliseconds before emitting `complete`. If zero, the timer will emit in the `nextTick`.
### Returns
A function which can be called to cancel the timer.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.timer
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-observer`](https://www.npmjs.com/package/@kingjs/i-observer)|`latest`|
|[`@kingjs/promise.sleep`](https://www.npmjs.com/package/@kingjs/promise.sleep)|`latest`|
|[`@kingjs/rx.create`](https://www.npmjs.com/package/@kingjs/rx.create)|`latest`|
## Source
https://repository.kingjs.net/rx/timer
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/timer)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.timer
