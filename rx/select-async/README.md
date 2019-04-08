# @[kingjs][@kingjs]/[rx][ns0].[select-async][ns1]
Returns an `IObservable` that maps values emitted from the current `IObservable`.
## Usage
```js
var assert = require('assert');
var { Subscribe } = require('@kingjs/i-observable');
var of = require('@kingjs/rx.of');
var Select = require('@kingjs/rx.select-async');

async function run() {
  var result = [];

  await new Promise((resolve) => {
    of(0, 1, 2)[Select](o => o + 1)[Subscribe](
      o => result.push(o),
      resolve,
    );
  });

  assert.deepEqual(result, [1, 2, 3]);
}
run();
```

## API
```ts
selectAsync(this, callback)
```

### Parameters
- `this`: The source `IObservable` whose emitted value are mapped.
- `callback`: An async function that maps each emitted value.
### Returns
Returns a new `IObservable` that emits mapped values.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.select-async
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/rx.create`](https://www.npmjs.com/package/@kingjs/rx.create)|`latest`|
|[`@kingjs/rx.i-observable`](https://www.npmjs.com/package/@kingjs/rx.i-observable)|`latest`|
|[`@kingjs/rx.i-observer`](https://www.npmjs.com/package/@kingjs/rx.i-observer)|`latest`|
## Source
https://repository.kingjs.net/rx/select-async
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/select-async)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.select-async
