# @[kingjs][@kingjs]/[task-pool][ns0]
Creates function that will start a finite number of tasks before queuing a finite number pending task until the pending queue overflows and then calls `bounce` to pick a pending task to drop.
## Usage
```js
var assert = require('assert');
var taskPool = require('@kingjs/task-pool');

// pool of size one that buffers latest task 
// and drops oldest task on buffer overrun.
var pool = taskPool();

var result = [];
var promise = new Promise(resolve => {
  pool(() => result.push(0));
  pool(() => result.push(1)); 
  pool(() => { 
    result.push(2);
    resolve() 
  });
});

promise.then(
  () => assert.deepEqual(result, [0, 2])
)

```

## API
```ts
taskPool(maxConcurrent, maxPending, bounce(queue))
```

### Parameters
- `maxConcurrent`: The maximum number of concurrent tasks. The default value is 1.
- `maxPending`: The maximum number of pending tasks. The default value is 1.
- `bounce`: Invoked to pick which pending task to drop. The default will remove the oldest task.
  - `queue`: The pending task queue.
  - Returns the queue with few elements.
### Returns
Returns a function that will start tasks.


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
