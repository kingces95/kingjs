# @[kingjs][@kingjs]/[rx][ns0].[of][ns1]
The description.
## Usage
```js
var assert = require('assert');
var of = require('@kingjs/rx.of');

var result = [];
var observable = of(0, 1, 2);
observable.subscribe(o => result.push(o));
assert.deepEqual(result, [0, 1, 2]);
```

## API
```ts
of(this, foo)
```

### Parameters
- `this`: `this` comment.
- `foo`: `foo` comment.
### Returns
Returns comment.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.of
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-observer`](https://www.npmjs.com/package/@kingjs/i-observer)|`latest`|
|[`@kingjs/rx.create`](https://www.npmjs.com/package/@kingjs/rx.create)|`latest`|
## Source
https://repository.kingjs.net/rx/of
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/of)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.of
