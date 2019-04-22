# @[kingjs][@kingjs]/[task-pool][ns0]
A pool of running tasks and a queue of pending tasks. Tasks are added by calling `start` and are either executed without delay or put into a pending queue which,  upon overflow, is culled via a callback.
## Usage
```js
var assert = require('assert');
var TaskPool = require('@kingjs/task-pool');

// pool of size one that buffers latest task and drops
// oldest task on buffer overrun.
var pool = new TaskPool();

var events = [];
pool.on('start', o => events.push({ start: o.name }))
pool.on('finish', o => events.push({ finish: o.name }))
pool.on('block', o => events.push({ block: o.name }))
pool.on('drop', o => events.push({ drop: o.name }))

var result = [];
var promise = new Promise(resolve => {
  pool.start(function zero() { result.push(0) });
  pool.start(function one() { result.push(1) });
  pool.start(function two() { 
    result.push(2);
    resolve() 
  });
});

promise.then(() => {
  assert.deepEqual(result, [0, 2])
  assert.deepEqual(events, [
    { start: 'zero' },
    { block: 'one' },
    { block: 'two' },
    { drop: 'one' },
    { finish: 'zero' },
    { start: 'two' },
  ])
})

```



### Parameters
- `maxConcurrent`: The maximum number of concurrent tasks. The default value is 1.
- `maxPending`: The maximum number of pending tasks. The default value is 1.
- `bounce`: Invoked when the pending queue overflows and returns the index of the task to drop. The default culls the oldest task.
  - `queue`: The pending task queue.
  - Should return `queue` with fewer elements.

### Remarks
 - TaskPool emits the following events with a task
   - `'start'` when the task is scheduled to run
   - `'finish'` when the task returns
   - `'block'` when the task is put onto the pending queue
   - `'drop'` when the task is dropped from pending queue
 - Event `'finish'` is proceeded by `'start'`
 - Event `'drop'` is proceeded by `'block'`
 - Event `'start'` may be proceeded by `'block'`

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/task-pool
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/array.remove`](https://www.npmjs.com/package/@kingjs/array.remove)|`latest`|
|[`@kingjs/array.remove-at`](https://www.npmjs.com/package/@kingjs/array.remove-at)|`latest`|
## Source
https://repository.kingjs.net/task-pool
## License
MIT

![Analytics](https://analytics.kingjs.net/task-pool)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/task-pool
