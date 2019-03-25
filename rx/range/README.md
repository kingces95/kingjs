# @[kingjs][@kingjs]/[rx][ns0].[range][ns1]
The description.
## Usage
```js
require('kingjs')
var assert = require('assert');
var range = require('@kingjs/rx.range');

var result = [];
var observable = range(1, 3);
observable.subscribe(o => result.push(o));
assert.deepEqual(result, [1, 2, 3]);
```

## API
```ts
range(this, foo)
```

### Parameters
- `this`: `this` comment.
- `foo`: `foo` comment.
### Returns
Returns comment.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.range
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/linq.range`](https://www.npmjs.com/package/@kingjs/linq.range)|`latest`|
|[`@kingjs/linq.to-observable`](https://www.npmjs.com/package/@kingjs/linq.to-observable)|`latest`|
## Source
https://repository.kingjs.net/rx/range
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/range)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.range
