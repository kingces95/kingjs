# @[kingjs][@kingjs]/[linq][ns0].[sequence-equal][ns1]
Returns true if two sequences contain the same  number of elements and those that share the same index are equal.
## Usage
```js
require('kingjs');
var SequenceEqual = require('@kingjs/linq.sequence-equal');
var assert = require('assert');

function readme() {
  var expected = [1, 2, 3];
  
  var toFew = [1, 2];
  var tooMany = [1, 2, 3, 4];
  var wrongOrder = [3, 2, 1];
  var justRight = [1, 2, 3];
  
  var result = {
    tooFew: expected[SequenceEqual](toFew),
    tooMany: expected[SequenceEqual](tooMany),
    wrongOrder: expected[SequenceEqual](wrongOrder),
    justRight: expected[SequenceEqual](justRight),
  };

  assert(result.tooFew == false);
  assert(result.tooMany == false);
  assert(result.wrongOrder == false);
  assert(result.justRight == true);
}
readme();

function test(left, right, result, equal) {
  assert(left[SequenceEqual](right,
    equal
  ) == result);
};

test([ ], [ ], true);
test([ 0 ], [ 0 ], true);
test([ 0, 1 ], [ 0, 1 ], true);

test([ 0 ], [ ], false);
test([ ], [ 0 ], false);
test([ 0, 1 ], [ 0, 0 ], false);

var myEqual = function(l,r) { return l == -r; }
test([ ], [ ], true, myEqual);
test([ 0 ], [ 0 ], true, myEqual);
test([ 0, 1 ], [ 0, 1 ], false, myEqual);
test([ 0, 1 ], [ 0, -1 ], true, myEqual);

test([ 0 ], [ ], false, myEqual);
test([ ], [ 0 ], false, myEqual);
test([ 0, 1 ], [ 0, 0 ], false, myEqual);
```

## API
```ts
sequenceEqual(other, equals)
```

### Parameters
- `other`: 
- `equals`: 



## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.sequence-equal
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-enumerable`](https://www.npmjs.com/package/@kingjs/i-enumerable)|`latest`|
|[`@kingjs/i-enumerator`](https://www.npmjs.com/package/@kingjs/i-enumerator)|`latest`|
|[`@kingjs/linq.default-equal`](https://www.npmjs.com/package/@kingjs/linq.default-equal)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
## Source
https://repository.kingjs.net/linq/sequence-equal
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/sequence-equal)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.sequence-equal
