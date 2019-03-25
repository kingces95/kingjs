# @[kingjs][@kingjs]/[rx][ns0].[count][ns1]
The description.
## Usage
```js
require('kingjs')
var assert = require('assert');
var Count = require('@kingjs/rx.count');

var result;
var complete = false;
[0, 1, 2][Count]().subscribe(
  o => result = o,
  () => complete = true
);
assert(result == 3);
assert(complete);
```

## API
```ts
count(this, foo)
```

### Parameters
- `this`: `this` comment.
- `foo`: `foo` comment.
### Returns
Returns comment.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.count
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-observable`](https://www.npmjs.com/package/@kingjs/i-observable)|`latest`|
|[`@kingjs/i-observer`](https://www.npmjs.com/package/@kingjs/i-observer)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/rx.create`](https://www.npmjs.com/package/@kingjs/rx.create)|`latest`|
## Source
https://repository.kingjs.net/rx/count
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/count)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.count
