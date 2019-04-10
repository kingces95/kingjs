# @[kingjs][@kingjs]/[rx][ns0].[queue-many][ns1]
Returns an `IObservable` that asynchronously emits elements  selected from the `IObservable`s returned by callback optionally further selecting each resulting element.
## Usage
```js
require('@kingjs/shim')
var assert = require('assert');
var QueueMany = require('@kingjs/rx.queue-many');
var { Subscribe } = require('@kingjs/rx.i-observable');
var of = require('@kingjs/rx.of');

async function run() {

  result = [];
  await new Promise(resolve => {
    // for each emission select many `IObservable`s
    of({ 
      x: of(0, 2) 
    }, { 
      x: of(1, 3) 
    })
      [QueueMany](async o => await o.x, (o,x) => -x)
      [Subscribe](o => result.push(o), resolve);
  })
  assert.deepEqual(result, [0, -2, -1, -3])

  result = [];
  await new Promise(resolve => {
    //for each emission select many iterables
    of({ 
      x: [0, 2]
    }, { 
      x: [1, 3]
    })
      [QueueMany](async o => await o.x, (o,x) => -x)
      [Subscribe](o => result.push(o));
  })
  assert.deepEqual(result, [0, -2, -1, -3])
}
run()
```

## API
```ts
queueMany(this, selector(value)[, resultSelector(value)])
```

### Parameters
- `this`: The source `IObservable` whose each emission will be asynchronously mapped to an `IObservable` or iterable.
- `selector`: Asynchronously selects many elements from each emitted  element of the source `IObservable`.
  - `value`: The value from which many values are to be selected.
  - Returns an `IObservable` or iterable
- `resultSelector`: Synchronously selects each result.
  - `value`: One of the many resulting values to map.
  - Returns the value emitted.
### Returns
Returns a new `IObservable` that emits many values for each value emitted by the source `IObservable`.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.queue-many
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/rx.create`](https://www.npmjs.com/package/@kingjs/rx.create)|`latest`|
|[`@kingjs/rx.from`](https://www.npmjs.com/package/@kingjs/rx.from)|`latest`|
|[`@kingjs/rx.i-observable`](https://www.npmjs.com/package/@kingjs/rx.i-observable)|`latest`|
|[`@kingjs/rx.i-observer`](https://www.npmjs.com/package/@kingjs/rx.i-observer)|`latest`|
## Source
https://repository.kingjs.net/rx/queue-many
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/queue-many)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.queue-many
