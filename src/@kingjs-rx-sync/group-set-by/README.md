# @[kingjs][@kingjs]/[rx][ns0].[select-many][ns1]
Returns an `IObservable` emits the elements selected from the many `IObservable`s returned by callback optionally further selecting each resulting element.
## Usage
```js
require('@kingjs/shim')
var assert = require('assert');
var SelectMany = require('@kingjs/rx.select-many');
var { Subscribe } = require('@kingjs/rx.i-observable');
var of = require('@kingjs/rx.of');

// for each emission select many `IObservable`s
result = [];
of({ 
  x: of(0, 2) 
}, { 
  x: of(1, 3) 
})
  [SelectMany](o => o.x, (o, x) => -x)
  [Subscribe](o => result.push(o));
assert.deepEqual(result, [0, -2, -1, -3])

// for each emission select many iterables
result = [];
of({ 
  x: [0, 2]
}, { 
  x: [1, 3]
})
  [SelectMany](o => o.x, (o, x) => -x)
  [Subscribe](o => result.push(o));
assert.deepEqual(result, [0, -2, -1, -3])
```

## API
```ts
selectMany(this[, selector(value)[, resultSelector(value)]])
```

### Parameters
- `this`: The source `IObservable` whose each emission will be mapped to an `IObservable` or iterable.
- `selector`: Selects many elements from each emitted element of the source `IObservable`.
  - `value`: The value from which many values are to be selected.
  - Returns an `IObservable` or iterable
- `resultSelector`: Selects each resultiIdentity.
  - `value`: One of the many resulting values to map.
  - Returns the value emitted.
### Returns
Returns a new `IObservable` that emits many values for each value emitted by the source `IObservable`.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.select-many
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/rx.from`](https://www.npmjs.com/package/@kingjs/rx.from)|`latest`|
|[`@kingjs/rx.i-observable`](https://www.npmjs.com/package/@kingjs/rx.i-observable)|`latest`|
|[`@kingjs/rx.i-observer`](https://www.npmjs.com/package/@kingjs/rx.i-observer)|`latest`|
|[`@kingjs/rx.i-published-observable`](https://www.npmjs.com/package/@kingjs/rx.i-published-observable)|`latest`|
|[`@kingjs/rx.subject`](https://www.npmjs.com/package/@kingjs/rx.subject)|`latest`|
## Source
https://repository.kingjs.net/rx/select-many
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/select-many)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.select-many
