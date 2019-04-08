# @[kingjs][@kingjs]/[rx][ns0].[pipe][ns1]
Subscribes `subject` to the source `IObservable` and returns the `subject`.
## Usage
```js
var assert = require('assert');
var { Subscribe } = require('@kingjs/i-observable');
var of = require('@kingjs/rx.of');
var Select = require('@kingjs/rx.pipe');

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
pipe(this, subject)
```

### Parameters
- `this`: The `IObservable` to which `subject` will be subscribed.
- `subject`: The subject to be subscribed to the source `IObservables`.
### Returns
Returns `subject`.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.pipe
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/rx.create`](https://www.npmjs.com/package/@kingjs/rx.create)|`latest`|
|[`@kingjs/rx.i-observable`](https://www.npmjs.com/package/@kingjs/rx.i-observable)|`latest`|
|[`@kingjs/rx.i-observer`](https://www.npmjs.com/package/@kingjs/rx.i-observer)|`latest`|
## Source
https://repository.kingjs.net/rx/pipe
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/pipe)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.pipe
