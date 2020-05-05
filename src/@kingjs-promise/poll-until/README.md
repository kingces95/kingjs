# @[kingjs][@kingjs]/[promise][ns0].[poll-until][ns1]
Return a promise fulfilled when `predicate`, polled at `period`, returns `true`, or rejected after a timeout.
## Usage
```js
var assert = require('assert');
var pollUntil = require('@kingjs/promise.poll-until');

var count = 3;
var period = 50;
var start = Date.now();

var i = 0;
pollUntil(
 () => i++ == count, 
 period,
 null
).then(() => {
  assert(i == count + 1);
  assert(Date.now() - start > period * count)
})

var j = 0;
pollUntil(
  () => { j++; return false }, 
  period,
  period * count
).catch(() => {
  assert(j > count);
  assert(Date.now() - start > period * count)
})
```

## API
```ts
pollUntil(predicate[, interval[, timeout]])
```

### Parameters
- `predicate`: Continue polling until this predicate returns true.
- `interval`: The period in milliseconds at which to poll the predicate.
- `timeout`: Time in milliseconds to reject the promise regardless of predicate value.
### Returns
Returns a promise fulfilled after `predicate` returns `true` or  rejected after `timeout`.
### Remarks
Under the hood, polling is done by looping inside of `process.nextTick` until either `predicate` returns true or `timeout` as elapsed and `await`ing  a `sleep`ing promise for `period`.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/promise.poll-until
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/promise.sleep`](https://www.npmjs.com/package/@kingjs/promise.sleep)|`latest`|
## Source
https://repository.kingjs.net/promise/poll-until
## License
MIT

![Analytics](https://analytics.kingjs.net/promise/poll-until)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/promise
[ns1]: https://www.npmjs.com/package/@kingjs/promise.poll-until
