# @[kingjs][@kingjs]/[rx][ns0].[blend][ns1]
Returns an `IObservable` that blends this `IObservable` with those passed as arguments.
## Usage
```js
require('@kingjs/shim')
var assert = require('assert')
var Blend = require('@kingjs/rx.blend');
var { Subscribe } = require('@kingjs/i-observable');
var clock = require('@kingjs/rx.clock');
var Select = require('@kingjs/rx.select');
var sleep = require('@kingjs/promise.sleep');

var result = [];
var expected = [];

function start(ms, id) {
  return clock(ms)[Select](t => {
    var value = { t, id };
    expected.push(value);
    return value;
  })
}

process.nextTick(async () => {
  var a = start(5, 'a')
  var b = start(7, 'b')
  var c = start(11, 'c')

  var abc = a[Blend](b, c);
  var dispose = abc[Subscribe](o => { result.push(o) });
  await sleep(27);
  dispose();

  assert.deepEqual(expected, result);
});
```

## API
```ts
blend(this, arguments)
```

### Parameters
- `this`: The `IObservable` whose emissions will be blended.
- `arguments`: A list of `IObservables` whose emissions will be blended.
### Returns
Returns a new `IObservable` that emits a blend of all emissions of this `IObservable` and all `IObservable`s passed as arguments.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.blend
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/rx.create`](https://www.npmjs.com/package/@kingjs/rx.create)|`latest`|
|[`@kingjs/rx.i-observable`](https://www.npmjs.com/package/@kingjs/rx.i-observable)|`latest`|
|[`@kingjs/rx.i-observer`](https://www.npmjs.com/package/@kingjs/rx.i-observer)|`latest`|
## Source
https://repository.kingjs.net/rx/blend
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/blend)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.blend
