# @[kingjs][@kingjs]/[linq][ns0].[single-or-undefined][ns1]
Returns the only element of a sequence that  satisfies a specified condition, or undefined.
## Usage
```js
require('kingjs');
var SingleOrUndefined = require('@kingjs/linq.single-or-undefined');
var assert = require('assert');

assert([0][SingleOrUndefined]() == 0);
assert([][SingleOrUndefined]() === undefined);
assert([0, 1][SingleOrUndefined]() === undefined);

function isOdd(x) {
  return x % 2 == 1; 
}

assert([0, 1, 2][SingleOrUndefined](isOdd) == 1);
assert([][SingleOrUndefined](isOdd) === undefined);
assert([0][SingleOrUndefined](isOdd) === undefined);
assert([0, 1, 2, 3][SingleOrUndefined](isOdd) === undefined);


```

## API
```ts
singleOrUndefined(predicate)
```

### Parameters
- `predicate`: 



## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.single-or-undefined
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-enumerable`](https://www.npmjs.com/package/@kingjs/i-enumerable)|`latest`|
|[`@kingjs/i-enumerator`](https://www.npmjs.com/package/@kingjs/i-enumerator)|`latest`|
|[`@kingjs/linq.where`](https://www.npmjs.com/package/@kingjs/linq.where)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
## Source
https://repository.kingjs.net/linq/single-or-undefined
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/single-or-undefined)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.single-or-undefined
