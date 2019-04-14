# @[kingjs][@kingjs]/[rx][ns0].[group-by][ns1]
Returns an `IObservable` that emits an `IGroupedObservable` for each group identified by `keySelector`.
## Usage
```js
require('@kingjs/shim')
var assert = require('assert');
var GroupBy = require('@kingjs/rx.group-by');
var { Subscribe } = require('@kingjs/rx.i-observable');
var { Key } = require('@kingjs/i-grouped-observable');
var of = require('@kingjs/rx.of');

result = { };
of(0, 1, 2, 3)
  [GroupBy](o => o % 2 ? 'odd' : 'even', o => -o)
  [Subscribe](o => {
    var values = result[o[Key]] = [];
    o[Subscribe](x => values.push(x))
  });

assert.deepEqual(result, {
  even: [ 0, -2 ],
  odd: [ -1, -3 ]
})
```

## API
```ts
groupBy(this[, keySelector(value)[, resultSelector]])
```

### Parameters
- `this`: The `IObservable` to group.
- `keySelector`: A callback that selects a key for each emitted value.
  - `value`: The value emitted by `this`.
  - Returns a primitive key used to group the value.
- `resultSelector`: A callback that maps each value before being  emitted by its `IGroupedObservable`.
### Returns
Returns an `IObservable` that emits `IGroupedObservable`.
### Remarks
The `key` returned by `callback` is used as a property name into an object which acts as the dictionary of groups. As such, `key` should be primitive.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.group-by
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
https://repository.kingjs.net/rx/group-by
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/group-by)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.group-by
