# @[kingjs][@kingjs]/[rx][ns0].[map][ns1]
The description.
## Usage
```js
require('kingjs');
var assert = require('assert');
var { Subscribe } = require('@kingjs/i-observable');
var Map = require('@kingjs/rx.map');

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
map(this, foo)
```

### Parameters
- `this`: `this` comment.
- `foo`: `foo` comment.
### Returns
Returns comment.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.map
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-observable`](https://www.npmjs.com/package/@kingjs/i-observable)|`latest`|
|[`@kingjs/i-observer`](https://www.npmjs.com/package/@kingjs/i-observer)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/rx.create-sync`](https://www.npmjs.com/package/@kingjs/rx.create-sync)|`latest`|
## Source
https://repository.kingjs.net/rx/map
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/map)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.map
