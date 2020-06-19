# @[kingjs][@kingjs]/[rx][ns0].[rolling-select][ns1]
Returns an `IObservable` whose each value is an array containing the current value followed by previously emitted values.
## Usage
```js
var assert = require('assert');
var ToArray = require('@kingjs/rx.to-array');
var Then = require('@kingjs/rx.then');
var RollingSelect = require('@kingjs/rx.rolling-select');
var timer = require('@kingjs/rx.timer');
var from = require('@kingjs/rx.from');

var value = [0, 1, 2];

async function run() {
  var result = await timer()
    [Then](from(value))
    [RollingSelect](
      o => o.slice()
    )
    [ToArray]();

  assert.deepEqual(result, [
    [0],
    [1, 0],
    [2, 1]
  ]);
}
run();

```

## API
```ts
rollingSelect(selector[, size])
```

### Parameters
- `selector`: A callback that selects a value from an array containing the current value and a number of previous values.
- `size`: The count of the previous values to include in the window. The default is `1`.
### Returns
Returns an `IObservable` whose each value is an array containing the current value followed by previously  emitted values or a selection of that array.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.rolling-select
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/rx.create`](https://www.npmjs.com/package/@kingjs/rx.create)|`latest`|
|[`@kingjs/rx.i-observable`](https://www.npmjs.com/package/@kingjs/rx.i-observable)|`latest`|
|[`@kingjs/rx.i-observer`](https://www.npmjs.com/package/@kingjs/rx.i-observer)|`latest`|
## Source
https://repository.kingjs.net/rx/rolling-select
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/rolling-select)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.rolling-select
