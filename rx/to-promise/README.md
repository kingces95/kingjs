# @[kingjs][@kingjs]/[rx][ns0].[to-promise][ns1]
Returns a promise that resolves with the value of the next `next` emission or `complete` and rejects on `error`.
## Usage
```js
require('@kingjs/shim')
var assert = require('assert');
var of = require('@kingjs/rx.of');
var timer = require('@kingjs/rx.timer');
var Then = require('@kingjs/rx.then');
var ToPromise = require('@kingjs/rx.to-promise');

async function run() {
  var value = await timer()
    [Then](of(0))
    [ToPromise]();

  assert(value == 0);
}
run();
```

## API
```ts
toPromise(this)
```

### Parameters
- `this`: The source `IObservable` whose emission resolves the promise.
### Returns
Returns a promise that that resolves with the value of the next `next` emission or `complete` and rejects on `error`.
### Remarks
The subscription used by the promise to resolve upon a `next` emission also schedules a disposal of the subscription.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.to-promise
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/rx.i-observable`](https://www.npmjs.com/package/@kingjs/rx.i-observable)|`latest`|
## Source
https://repository.kingjs.net/rx/to-promise
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/to-promise)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.to-promise
