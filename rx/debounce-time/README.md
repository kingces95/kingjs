# @[kingjs][@kingjs]/[rx][ns0].[debounce-time][ns1]
Filter values by those followed without emissions for `duration` milliseconds.
## Usage
```js
require('kingjs');
var assert = require('assert');
var { Subscribe } = require('@kingjs/i-observable');
var Map = require('@kingjs/rx.debounce-time');

async function run() {
  var result = [];

  await new Promise((resolve) => {
    [0, 1, 2][Map](o => o + 1)[Subscribe](
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
debounceTime(this, foo)
```

### Parameters
- `this`: `this` The observable whose values will be filtered.
- `foo`: `duration` The time in milliseconds an emission must be followed by no additional emission to pass through this filter.
### Returns
Returns an observable whose values are filtered by emissions followed by no emissions for `duration` milliseconds.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.debounce-time
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-observable`](https://www.npmjs.com/package/@kingjs/i-observable)|`latest`|
|[`@kingjs/i-observer`](https://www.npmjs.com/package/@kingjs/i-observer)|`latest`|
|[`@kingjs/linq.to-observable`](https://www.npmjs.com/package/@kingjs/linq.to-observable)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/rx.create`](https://www.npmjs.com/package/@kingjs/rx.create)|`latest`|
## Source
https://repository.kingjs.net/rx/debounce-time
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/debounce-time)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.debounce-time
