# @[kingjs][@kingjs]/[rx][ns0].[skip][ns1]
Returns an `IObservable` which skips the first n observations.
## Usage
```js
var assert = require('assert');
var { Subscribe } = require('@kingjs/rx.i-observable');
var { Next } = require('@kingjs/rx.i-observer');
var of = require('@kingjs/rx.of');
var Skip = require('@kingjs/rx.skip');
var ToArray = require('@kingjs/rx.to-array')

of(0, 1, 2, 3)
  [Skip](2)
  [ToArray]()
  .then(
    o => assert.deepEqual(o, [2, 3])
  )
```

## API
```ts
skip()
```




## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.skip
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/rx.create`](https://www.npmjs.com/package/@kingjs/rx.create)|`latest`|
|[`@kingjs/rx.i-observable`](https://www.npmjs.com/package/@kingjs/rx.i-observable)|`latest`|
|[`@kingjs/rx.i-observer`](https://www.npmjs.com/package/@kingjs/rx.i-observer)|`latest`|
## Source
https://repository.kingjs.net/rx/skip
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/skip)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.skip
