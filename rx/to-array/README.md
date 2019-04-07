# @[kingjs][@kingjs]/[rx][ns0].[to-array][ns1]
Returns a promise that resolves with an array containing emitted values before `complete` or rejects on `error`.
## Usage
```js
require('@kingjs/shim')
var assert = require('assert');
var of = require('@kingjs/rx.of');
var timer = require('@kingjs/rx.timer');
var Then = require('@kingjs/rx.then');
var ToPromise = require('@kingjs/rx.to-array');

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
toArray(this)
```

### Parameters
- `this`: The source `IObservable` whose emission are captured.
### Returns
Returns a promise that that resolves with the value of the `next` emissions before `complete` and rejects on `error`.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.to-array
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-observable`](https://www.npmjs.com/package/@kingjs/i-observable)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
## Source
https://repository.kingjs.net/rx/to-array
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/to-array)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.to-array
