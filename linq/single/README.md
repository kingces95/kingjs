# @[kingjs][@kingjs]/[linq][ns0].[single][ns1]
Returns the only element of a sequence  that satisfies a specified condition.
## Usage
```js
require('kingjs');
var single = require('@kingjs/linq.single');
var assert = require('assert');
var assertThrows = require('@kingjs/assert-throws');

assert(single.call(sequence(0)) == 0);
assertThrows(function() { 
  single.call(sequence());
});
assertThrows(function() { 
  single.call(sequence(0, 1))
});

function isOdd(x) {
  return x % 2 == 1; 
}

assert(single.call([1, 2, 3], isOdd) == 1);
assertThrows(function() { 
  single.call(sequence(), isOdd)
});
assertThrows(function() { 
  single.call(sequence(0), isOdd)
});
assertThrows(function() { 
  single.call(sequence(0, 1, 3), isOdd)
});

```

## API
```ts
single(predicate)
```

### Parameters
- `predicate`: 



## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.single
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-enumerable`](https://www.npmjs.com/package/@kingjs/i-enumerable)|`latest`|
|[`@kingjs/i-enumerator`](https://www.npmjs.com/package/@kingjs/i-enumerator)|`latest`|
|[`@kingjs/linq.where`](https://www.npmjs.com/package/@kingjs/linq.where)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
## Source
https://repository.kingjs.net/linq/single
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/single)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.single
