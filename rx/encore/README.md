# @[kingjs][@kingjs]/[rx][ns0].[report][ns1]
Returns an `IObservable` that spies on the `complete` event.
## Usage
```js
require('@kingjs/shim')
var assert = require('assert');
var { Subscribe } = require('@kingjs/i-observable');
var of = require('@kingjs/rx.of');
var Report = require('@kingjs/rx.report');

var f = 'f';

var N = 'N';
var C = 'C';
var E = 'E';

var result = [];

of(0, 1)
  [Report](
    () => result.push(f),
  )
  [Subscribe](
    o => result.push(N, o),
    () => result.push(C),
    o => result.push(E, o),
  );

assert.deepEqual(result, [
  N, 0, 
  N, 1, 
  f, C
]);
```

## API
```ts
encore(this, callback)
```

### Parameters
- `this`: The source `IObservable` whose `complete` event is spied upon.
- `callback`: The callback to make when `complete` event occurs.
### Returns
Returns a new `IObservable` that behaves like the source `IObservable` modulo any side effects introduced by `callback`.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.report
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-observable`](https://www.npmjs.com/package/@kingjs/i-observable)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/rx.spy`](https://www.npmjs.com/package/@kingjs/rx.spy)|`latest`|
## Source
https://repository.kingjs.net/rx/report
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/report)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.report
