# @[kingjs][@kingjs]/[linq][ns0].[any][ns1]
Returns true if any element of a sequence satisfies a condition.
## Usage
```js
require('kingjs');
var assert = require('assert');
var Any = require('@kingjs/linq.any');

var sequence = [0, 1, 2];

assert(sequence[Any]());
assert(sequence[Any](function(o) { return o == 1; }));
assert(!sequence[Any](function(o) { return o == 3; }));
```

## API
```ts
any(this[, predicate])
```

### Parameters
- `this`: An IEnumerable that contains the elements to which the predicate will be applied.
- `predicate`: A function to test each element for a condition.
### Returns
`true` if any elements in the source sequence pass the test  in the specified predicate; otherwise, `false`.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.any
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-enumerable`](https://www.npmjs.com/package/@kingjs/i-enumerable)|`^1.0.6`|
|[`@kingjs/i-enumerator`](https://www.npmjs.com/package/@kingjs/i-enumerator)|`^1.0.7`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`^1.0.1`|
## Source
https://repository.kingjs.net/linq/any
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/any)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.any
