# @[kingjs][@kingjs]/[rx][ns0].[once][ns1]
Create an `IObservable` that emits a single value.
## Usage
```js
require('@kingjs/shim')
var assert = require('assert');
var Once = require('@kingjs/rx.once');
var clock = require('@kingjs/rx.clock');
var { Subscribe } = require('@kingjs/i-observable');

async function run() {
  var value = 1;
  var result;

  await new Promise(resolve => {
    var observer = clock()[Once](value);
    observer[Subscribe](o => result = o, resolve);
  })

  assert.equal(result, value)
}
run();
```

## API
```ts
once(this, value)
```

### Parameters
- `this`: The `IObservable` whose next emission is replaced with `value`.
- `value`: The value emit.
### Returns
Returns an observable that emits a single value, completes, and then disposes itself.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.once
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/rx.i-observable`](https://www.npmjs.com/package/@kingjs/rx.i-observable)|`latest`|
|[`@kingjs/rx.zip`](https://www.npmjs.com/package/@kingjs/rx.zip)|`latest`|
## Source
https://repository.kingjs.net/rx/once
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/once)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.once
