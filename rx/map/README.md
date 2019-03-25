# @[kingjs][@kingjs]/[rx][ns0].[map][ns1]
The description.
## Usage
```js
require('kingjs');
var assert = require('assert');
var Map = require('@kingjs/rx.map');

var result = [];
var completed = false;
[0, 1, 2][Map](o => o + 1).subscribe(
  o => result.push(o),
  () => completed = true,
);
assert.deepEqual(result, [1, 2, 3]);
assert(completed);
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
|[`@kingjs/rx.observable`](https://www.npmjs.com/package/@kingjs/rx.observable)|`latest`|
## Source
https://repository.kingjs.net/rx/map
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/map)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.map
