# @[kingjs][@kingjs]/[rx][ns0].[distinct][ns1]
Returns an `IObservable` whose each value is distinct.
## Usage
```js
require('@kingjs/shim')
var assert = require('assert');
var { Subscribe } = require('@kingjs/rx.i-observable');
var Distinct = require('@kingjs/rx.distinct');
var of = require('@kingjs/rx.of');

var expected = [0, 1, 2]

of(0, 1, 2, 0, 1, 2)
  [Distinct]()
  [Subscribe](o => 
    assert.equal(o, expected.pop())
  );
```

## API
```ts
distinct([keySelector[, equal]])
```

### Parameters
- `keySelector`: A callback to select the key used to  determine equality between two emitted values.
- `equal`: An call back which determines if two keys are equal.
### Returns
Returns an `IObservable` whose each value is distinct.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.distinct
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/rx.create`](https://www.npmjs.com/package/@kingjs/rx.create)|`latest`|
|[`@kingjs/rx.i-observable`](https://www.npmjs.com/package/@kingjs/rx.i-observable)|`latest`|
|[`@kingjs/rx.i-observer`](https://www.npmjs.com/package/@kingjs/rx.i-observer)|`latest`|
## Source
https://repository.kingjs.net/rx/distinct
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/distinct)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.distinct
