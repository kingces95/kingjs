# @[kingjs][@kingjs]/[rx][ns0].[toggle][ns1]
Returns an `IObservable` that for each source emission of the source `IObservable` emits an `IGroupedObservable` or completes a  the `IGroupedObservable` previously emitted for that source emission.
## Usage
```js
require('@kingjs/shim')
var assert = require('assert');
var Toggle = require('@kingjs/rx.toggle');
var timer = require('@kingjs/rx.timer');
var Subject = require('@kingjs/rx.subject');
var { Subscribe } = require('@kingjs/rx.i-observable');
var { Key } = require('@kingjs/i-grouped-observable');
var of = require('@kingjs/rx.of');

result = [];

var source = new Subject();
source
  [Toggle](() => timer())
  [Subscribe](o => {
    o[Subscribe](() => result.push(o[Key]))
  });

source[Next](0);
source[Next](0);
source[Next](1);

setTimeout(() => {
  assert.deepEqual(result, [1]);  
});

```

## API
```ts
toggle(this[, activator[, keySelector]])
```

### Parameters
- `this`: The source `IObservable`.
- `activator`: A callback that selects an `IObservable` given a emission from the source `IObservable`.
- `keySelector`: A callback that selects a `Key` to be attached to the `IObservable` returned by `activator`.
### Returns
Returns an `IObservable` that emits `IGroupedObservable` for a source emission that is completed by a subsequent matching source emission.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.toggle
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/rx.create`](https://www.npmjs.com/package/@kingjs/rx.create)|`latest`|
|[`@kingjs/rx.i-grouped-observable`](https://www.npmjs.com/package/@kingjs/rx.i-grouped-observable)|`latest`|
|[`@kingjs/rx.i-observable`](https://www.npmjs.com/package/@kingjs/rx.i-observable)|`latest`|
|[`@kingjs/rx.i-observer`](https://www.npmjs.com/package/@kingjs/rx.i-observer)|`latest`|
## Source
https://repository.kingjs.net/rx/toggle
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/toggle)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.toggle
