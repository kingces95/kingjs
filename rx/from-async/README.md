# @[kingjs][@kingjs]/[rx][ns0].[from-async][ns1]
Create an `IObservable` from an async generator.
## Usage
```js
require('@kingjs/shim')
var assert = require('assert');
var fromAsync = require('@kingjs/rx.from-async');
var sleep = require('@kingjs/promise.sleep');
var never = require('@kingjs/promise.never');
var { Subscribe } = require('@kingjs/i-observable');

var result = [];

process.nextTick(async () => {
  var dispose;
  var promise = new Promise(resolve => {
    dispose = fromAsync(async function *() {
      yield 1;
      await sleep(50);
      yield 2;
      resolve();
      await sleep(150);
      //await never();
    })[Subscribe](
      o => result.push(o)
    );
  })

  assert(result.length == 0);
  await promise;
  assert(result.length == 2);
  dispose();
})

```

## API
```ts
fromAsync(generator)
```

### Parameters
- `generator`: The generator whose values are to be emitted.
### Returns
Returns `IObservable` that emits elements returned by an async generator.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.from-async
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-observer`](https://www.npmjs.com/package/@kingjs/i-observer)|`latest`|
|[`@kingjs/rx.create`](https://www.npmjs.com/package/@kingjs/rx.create)|`latest`|
## Source
https://repository.kingjs.net/rx/from-async
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/from-async)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.from-async
