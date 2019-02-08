# @[kingjs][@kingjs]/[linq][ns0].[all][ns1]
Returns true if all elements of a sequence satisfy a condition.
## Usage
```js
require('kingjs');
var assert = require('assert');
var All = require('@kingjs/linq.all');

var sequence = [0, 1, 2];

assert(sequence[All](function(o) { return o < 3; }));
assert(!sequence[All](function(o) { return o < 2; }));
```

## API
```ts
all(this, predicate)
```

### Parameters
- `this`: An IEnumerable that contains the elements to which the predicate will be applied.
- `predicate`: A function to test each element for a condition.
### Returns
`true` if every element of the source sequence passes the test in the  specified predicate, or if the sequence is empty; otherwise, `false`.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.all
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-enumerable`](https://www.npmjs.com/package/@kingjs/i-enumerable)|`^1.0.6`|
|[`@kingjs/i-enumerator`](https://www.npmjs.com/package/@kingjs/i-enumerator)|`^1.0.7`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`^1.0.1`|
## Source
https://repository.kingjs.net/linq/all
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/all)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.all
