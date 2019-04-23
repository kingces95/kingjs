# @[kingjs][@kingjs]/[rx][ns0].[pool][ns1]
Selects an `IObservable` from each observation and uses a `TaskPool` to asynchronously blend the emissions of those `IObservables`.
## Usage
```js
require('@kingjs/shim')
var assert = require('assert');
var Pool = require('@kingjs/rx.pool');
var { Subscribe } = require('@kingjs/rx.i-observable');
var of = require('@kingjs/rx.of');

var result = [];

var promise = new Promise(resolve => {
  of(0, 1, 2)
    [Pool](async o => o)
    [Subscribe](
      o => result.push(o),
      () => resolve()
    )
})

promise.then(() => {
  assert.deepEqual(result, [0, 2])
})
```

## API
```ts
pool(this[, selector(value)[, resultSelector(value)[, taskPool]]])
```

### Parameters
- `this`: The source `IObservable` whose emitted values `selector` transforms to `IObservable`s whose values `TaskPool` blends.
- `selector`: Given an emission from the source `IObservable` selects an `IObservable`. Default is identity.
  - `value`: The value from which many values are to be selected.
  - Returns an `IObservable`.
- `resultSelector`: Synchronously selects each result emission. Default is identity.
  - `value`: One of the many resulting values to map.
  - Returns the value emitted.
- `taskPool`: The `TaskPool` to use to blend the emissions of the `IObservables` selected by `selector`. Default is the default `TaskPool`.
### Returns
Returns a new `IObservable` that asynchronously blends  emissions of `IObservables` selected from each emission of the  source `IObservable`.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.pool
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/rx.create`](https://www.npmjs.com/package/@kingjs/rx.create)|`latest`|
|[`@kingjs/rx.i-observable`](https://www.npmjs.com/package/@kingjs/rx.i-observable)|`latest`|
|[`@kingjs/rx.i-observer`](https://www.npmjs.com/package/@kingjs/rx.i-observer)|`latest`|
|[`@kingjs/task-pool`](https://www.npmjs.com/package/@kingjs/task-pool)|`latest`|
## Source
https://repository.kingjs.net/rx/pool
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/pool)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.pool
