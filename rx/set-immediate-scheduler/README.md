# @[kingjs][@kingjs]/[rx][ns0].[set-immediate-scheduler][ns1]
An instance of an `IScheduler` that schedules uses `process.nextTick` and reports time from `Date.now`.
## Usage
```js
var assert = require('assert');
var { Now, Schedule } = require('@kingjs/rx.i-scheduler');
var scheduler = require('@kingjs/rx.set-immediate-scheduler');

var result = [];

process.nextTick(() => result.push('nextTick'));
setImmediate(() => result.push('setImmediate'));

scheduler[Schedule](() => result.push('now'))

setImmediate(() => result.push('setImmediateEnd'));
process.nextTick(() => result.push('nextTickEnd'));

setTimeout(
  // see https://nodejs.org/es/docs/guides/event-loop-timers-and-nexttick/
  // see https://github.com/ReactiveX/rxjs/issues/2603
  () => assert.deepEqual(
    result, [
      'nextTick',
      'now',
      'nextTickEnd',
      'setImmediate',
      'setImmediateEnd',
    ]
  ), 
  50
)
```






## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.set-immediate-scheduler
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/promise.sleep`](https://www.npmjs.com/package/@kingjs/promise.sleep)|`latest`|
|[`@kingjs/reflect.implement-interface`](https://www.npmjs.com/package/@kingjs/reflect.implement-interface)|`latest`|
|[`@kingjs/rx.scheduler`](https://www.npmjs.com/package/@kingjs/rx.scheduler)|`latest`|
## Source
https://repository.kingjs.net/rx/set-immediate-scheduler
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/set-immediate-scheduler)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.set-immediate-scheduler
