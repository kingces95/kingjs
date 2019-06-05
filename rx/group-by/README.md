# @[kingjs][@kingjs]/[rx][ns0].[group-by][ns1]
Returns an `IObservable` that emits an `IGroupedObservable` for each group identified by `keySelector`.
## Usage
```js
require('@kingjs/shim')
var assert = require('assert');
var GroupBy = require('@kingjs/rx.group-by');
var Subject = require('@kingjs/rx.subject');
var { Subscribe } = require('@kingjs/rx.i-observable');
var { Key } = require('@kingjs/rx.i-grouped-observable');
var { Next, Complete } = require('@kingjs/rx.i-observer');

var subject = new Subject();
var grouping = subject
  [GroupBy](
    o => o % 2 ? 'odd' : 'even', 
    k => new Subject(),
  )

result = { };
grouping
  [Subscribe](o => {
    var values = result[o[Key]] = [];
    o[Subscribe](x => values.push(x))
  });

subject[Next](0)
subject[Next](1)
subject[Next](2)
subject[Next](3)

assert.deepEqual(result, {
  even: [ 0, 2 ],
  odd: [ 1, 3 ]
})
assert(grouping.groups.even instanceof Subject)
assert(grouping.groups.odd instanceof Subject)

// replay groups for subsequent subscriptions
result = [ ];
grouping[Subscribe](
  o => result.push(o[Key])
)
assert.deepEqual(result, ['even', 'odd'])

subject[Complete]();
result = [ ];
grouping[Subscribe](
  o => result.push(o[Key])
)
assert.deepEqual(result, [ ])

```

## API
```ts
groupBy(this[, keySelector(value)[, resultSelector(key, value)[, groupActivator(key)[, groupCloser(key, value)]]]])
```

### Parameters
- `this`: The `IObservable` to group.
- `keySelector`: A callback that selects a key for each emitted value.
  - `value`: The value emitted by `this`.
  - Returns a primitive key used to group the value.
- `resultSelector`: A callback that maps each value before being  emitted by its `IGroupedObservable`.
  - `key`: The group's key.
  - `value`: The group's next value.
  - Returns a projection of the value that would otherwise be 
emitted by a group identified by `key`.
- `groupActivator`: A callback that activates a subject to act as a new group given the group's key.
  - `key`: The group's key.
  - Returns a `Subject` to be used to emit values for the group
identified by `key`.
- `groupCloser`: A callback that, given a group's key and the next emission, returns false if the group should instead be completed.
  - `key`: The group's key.
  - `value`: The group's next value.
  - Returns `true` to complete the group instead of emitting `value`
or false to emit the `value`.
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
|[`@kingjs/rx.i-grouped-observable`](https://www.npmjs.com/package/@kingjs/rx.i-grouped-observable)|`latest`|
|[`@kingjs/rx.i-observable`](https://www.npmjs.com/package/@kingjs/rx.i-observable)|`latest`|
|[`@kingjs/rx.i-observer`](https://www.npmjs.com/package/@kingjs/rx.i-observer)|`latest`|
|[`@kingjs/rx.i-published-observable`](https://www.npmjs.com/package/@kingjs/rx.i-published-observable)|`latest`|
|[`@kingjs/rx.subject`](https://www.npmjs.com/package/@kingjs/rx.subject)|`latest`|
## Source
https://repository.kingjs.net/rx/group-by
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/group-by)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.group-by
