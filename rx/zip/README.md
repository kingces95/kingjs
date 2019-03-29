# @[kingjs][@kingjs]/[rx][ns0].[zip][ns1]
Create an `IObservable` that zips emitted values with an `IEnumerable` of values.
## Usage
```js
require('@kingjs/shim')
var assert = require('assert');
var Zip = require('@kingjs/rx.zip');
var clock = require('@kingjs/rx.clock');
var { Subscribe } = require('@kingjs/i-observable');

async function run() {
  var count = 3;
  var result = [];

  await new Promise(resolve => {
    var observer = clock()[Zip](function* () {
      for (var i = 0; i < count; i ++) {
        process.nextTick(() => result.push(null));
        yield i;
      }
    }, (tick, i) => ({ tick, i }));

    observer[Subscribe](
      o => {
        assert(o.tick <= Date.now());
        result.push(o.i);
      },
      resolve
    );
  })

  assert.deepEqual(result, [0, null, 1, null, 2, null])
}
run();
```

## API
```ts
zip(this, value, callback(left, right))
```

### Parameters
- `this`: The source `IObservable` to zip.
- `value`: The `IEnumerable` to zip. None `IEnumerable` values will be  treated like the only member of an `IEnumerable`.
- `callback`: The callback that zips the `IObservable` with the `IEnumerable`.
  - `left`: The value pushed from the `IObservable`.
  - `right`: The value pulled from the `IEnumerable`.
  - Returns the value to be emitted by the zipped `IObservable`.
### Returns
An `IObservable` whose emitted values are those returned by `callback`
### Remarks
Once the `IEnumerable` is exhausted the `IObservable` will complete and then dispose itself.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.zip
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-enumerable`](https://www.npmjs.com/package/@kingjs/i-enumerable)|`latest`|
|[`@kingjs/i-enumerator`](https://www.npmjs.com/package/@kingjs/i-enumerator)|`latest`|
|[`@kingjs/i-observable`](https://www.npmjs.com/package/@kingjs/i-observable)|`latest`|
|[`@kingjs/i-observer`](https://www.npmjs.com/package/@kingjs/i-observer)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/rx.create`](https://www.npmjs.com/package/@kingjs/rx.create)|`latest`|
## Source
https://repository.kingjs.net/rx/zip
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/zip)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.zip
