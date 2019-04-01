# @[kingjs][@kingjs]/[rx][ns0].[call][ns1]
Filter values by those followed without emissions for `duration` milliseconds.
## Usage
```js
require('@kingjs/shim');
var assert = require('assert');
var DebounceTime = require('@kingjs/rx.call');
var clock = require('@kingjs/rx.clock');
var Zip = require('@kingjs/rx.zip');
var { Subscribe } = require('@kingjs/i-observable');

var duration = 50;

async function run() {
  var result = [];

  await new Promise((resolve) => {
    clock(() => duration * 2)
      [Zip]([0, 1], (l, r) => r)
      [DebounceTime](duration)
      [Subscribe](
        o => result.push(o),
        resolve,
      );
  });

  assert.deepEqual(result, [0, 1]);
}
run();

async function bounce() {
  var result = [];

  await new Promise((resolve) => {
    clock(() => duration / 2)
      [Zip]([0, 1], (l, r) => r)
      [DebounceTime](duration)
      [Subscribe](
        o => result.push(o),
        resolve,
      );
  });

  assert.deepEqual(result, [1]);
}
bounce();
```

## API
```ts
call(this, window)
```

### Parameters
- `this`: The observable whose values will be filtered.
- `window`: The time in milliseconds an emission must be followed by no additional emission to pass through this filter.
### Returns
Returns an observable whose values are filtered by emissions followed by no emissions for `duration` milliseconds.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.call
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-observable`](https://www.npmjs.com/package/@kingjs/i-observable)|`latest`|
|[`@kingjs/i-observer`](https://www.npmjs.com/package/@kingjs/i-observer)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/rx.clock`](https://www.npmjs.com/package/@kingjs/rx.clock)|`latest`|
|[`@kingjs/rx.create`](https://www.npmjs.com/package/@kingjs/rx.create)|`latest`|
## Source
https://repository.kingjs.net/rx/call
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/call)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.call
