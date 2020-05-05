# @[kingjs][@kingjs]/[linq][ns0].[aggregate][ns1]
Applies an accumulator function over a sequence.  The specified seed value is used as the initial accumulator value,  and the specified function is used to select the result value.
## Usage
```js
require('kingjs');
var assert = require('assert');
var Aggregate = require('@kingjs/linq.aggregate');

var sequence = [2, 3, 4];

var result = sequence[Aggregate](1, function(x) {
  return this + x; 
}, o => String(o));

assert(result === '10');
```

## API
```ts
aggregate(this, seed, aggregator, selector)
```

### Parameters
- `this`: An `IEnumerable` over which to aggregate.
- `seed`: The initial accumulator value.
- `aggregator`: An accumulator function toı be invoked on each element.
- `selector`: A function to transform the final accumulator value  into the result value.
### Returns
The transformed final accumulator value.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.aggregate
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-enumerable`](https://www.npmjs.com/package/@kingjs/i-enumerable)|`latest`|
|[`@kingjs/i-enumerator`](https://www.npmjs.com/package/@kingjs/i-enumerator)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
## Source
https://repository.kingjs.net/linq/aggregate
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/aggregate)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.aggregate
