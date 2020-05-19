# @[kingjs][@kingjs]/[rx][ns0].[first][ns1]
Returns a promise that resolves with the value of the next `next` emission or `complete` and rejects on `error`.
## Usage
```js
require('@kingjs/shim')
var assert = require('assert');
var of = require('@kingjs/rx.of');
var timer = require('@kingjs/rx.timer');
var Then = require('@kingjs/rx.then');
var ToPromise = require('@kingjs/rx.first');

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
first(this, predicate)
```

### Parameters
- `this`: The source `IObservable` whose emission resolves the promise.
- `predicate`: Ignore emissions that do no satisfy this predicate.
### Returns
Returns a promise that that resolves with the value of the next `next` emission or `complete` and rejects on `error`.
### Remarks
The promise will dispose its subscription upon receiving the first `next` emission.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.first
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/rx.i-observable`](https://www.npmjs.com/package/@kingjs/rx.i-observable)|`latest`|
## Source
https://repository.kingjs.net/rx/first
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/first)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.first
