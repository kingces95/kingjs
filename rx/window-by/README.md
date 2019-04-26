# @[kingjs][@kingjs]/[rx][ns0].[window-by][ns1]
Returns an `IObservable` that emits another `IObservable`,  a 'window', that emits values with matching keys. If a new key is  observed, then the window is closed and another activated.
## Usage
```js
require('@kingjs/shim')
var assert = require('assert');
var WindowBy = require('@kingjs/rx.window-by');
var { Key } = require('@kingjs/rx.i-grouped-observable');
var { Subscribe } = require('@kingjs/rx.i-observable');
var Subject = require('@kingjs/rx.subject');
var of = require('@kingjs/rx.of');
var SelectMany = require('@kingjs/rx.select-many');
var Log = require('@kingjs/rx.log');
var Spy = require('@kingjs/rx.spy');
var Finalize = require('@kingjs/rx.finalize');

var result = []
var subjectId = 0;

of(0, 1, 2, 3, 4, 5, 6, 7)
  [WindowBy](
    o => Math.floor(o / 3) % 2,
    (l, r) => l == r,
    (key, value) => ({ key, value }),
    key => {
      var subject = new Subject()
      subject.id = subjectId++
      return subject
    }
  )
  [Spy](
    o => assert(o[Key] >= 0 && o [Key] < 3)
  )
  [SelectMany](o => o
    [Log]('WINDOW')
    [Finalize](
      () => result.push(o.id)
    )
  )
  [Subscribe](
    o => result.push(o),
    () => assert.deepEqual(result, [ 
      { key: 0, value: 0 }, // 1
      { key: 0, value: 1 }, // 2
      { key: 0, value: 2 }, // 3
      0,                    // complete window
      { key: 1, value: 3 }, // 4
      { key: 1, value: 4 }, // 5
      { key: 1, value: 5 }, // 6
      1,                    // complete window
      { key: 0, value: 6 }, // 7
      { key: 0, value: 7 }, // 8
      2,                    // complete window
    ])
  )

// Logs:
// WINDOW { key: 0, value: 0 }
// WINDOW { key: 0, value: 1 }
// WINDOW { key: 0, value: 2 }
// WINDOW COMPLETE
// WINDOW { key: 1, value: 3 }
// WINDOW { key: 1, value: 4 }
// WINDOW { key: 1, value: 5 }
// WINDOW COMPLETE
// WINDOW { key: 0, value: 6 }
// WINDOW { key: 0, value: 7 }
// WINDOW COMPLETE
```

## API
```ts
windowBy(this[, keySelector(value)[, keyEquals(left, right)[, resultSelector(key, value)[, windowActivator(key)]]]])
```

### Parameters
- `this`: The source `IObservable`.
- `keySelector`: A callback that selects a key for each emitted value.
  - `value`: The value emitted by `this`.
  - Returns a primitive key used to group the value.
- `keyEquals`: A callback to compare keys.
  - `left`: The left key.
  - `right`: The right key.
  - Returns `true` or `false`.
- `resultSelector`: A callback that maps each value before being  emitted by its window.
  - `key`: The key.
  - `value`: The value.
  - Returns a result emitted by the window.
- `windowActivator`: A callback to activate a Subject to act as the window.
  - `key`: The key.
  - Returns a Subject to act as the window.
### Returns
Returns an `IObservable` that emits `IGroupedObservable` that  then emits source values with equal keys.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.window-by
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/rx.create`](https://www.npmjs.com/package/@kingjs/rx.create)|`latest`|
|[`@kingjs/rx.i-grouped-observable`](https://www.npmjs.com/package/@kingjs/rx.i-grouped-observable)|`latest`|
|[`@kingjs/rx.i-observable`](https://www.npmjs.com/package/@kingjs/rx.i-observable)|`latest`|
|[`@kingjs/rx.i-observer`](https://www.npmjs.com/package/@kingjs/rx.i-observer)|`latest`|
|[`@kingjs/rx.subject`](https://www.npmjs.com/package/@kingjs/rx.subject)|`latest`|
## Source
https://repository.kingjs.net/rx/window-by
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/window-by)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.window-by
