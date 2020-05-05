# @[kingjs][@kingjs]/[linq][ns0].[range][ns1]
Generate a range of numbers.
## Usage
```js
require('kingjs');
var range = require('@kingjs/linq.range');
var assert = require('assert');
var SequenceEqual = require('@kingjs/linq.sequence-equal');

function test(enumerable, array) {
  assert(enumerable[SequenceEqual](array));
}

test(range(0, 0), []);
test(range(0, 3), [0, 1, 2]);
test(range(-2, 2), [-2, -1]);
```

## API
```ts
range(start, count)
```

### Parameters
- `start`: 
- `count`: 



## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.range
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/reflect.implement-i-enumerable`](https://www.npmjs.com/package/@kingjs/reflect.implement-i-enumerable)|`latest`|
## Source
https://repository.kingjs.net/linq/range
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/range)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.range
