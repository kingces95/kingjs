# @[kingjs][@kingjs]/[linq][ns0].[single-or-undefined][ns1]
Returns the only element of a sequence that  satisfies a specified condition, or undefined.
## Usage
```js
require('kingjs');
var singleOrUndefined = require('@kingjs/linq.single-or-undefined');
var assert = require('assert');

assert(singleOrUndefined.call(sequence(0)) == 0);
assert(singleOrUndefined.call(sequence()) === undefined);
assert(singleOrUndefined.call(sequence(0, 1)) === undefined);

function isOdd(x) {
  return x % 2 == 1; 
}

assert(singleOrUndefined.call([1, 2, 3], isOdd) == 1);
assert(singleOrUndefined.call(sequence(), isOdd) === undefined);
assert(singleOrUndefined.call(sequence(0), isOdd) === undefined);
assert(singleOrUndefined.call(sequence(0, 1, 3), isOdd) === undefined);


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

## Source
https://repository.kingjs.net/linq/single-or-undefined
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/single-or-undefined)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.single-or-undefined
