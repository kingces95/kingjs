# @[kingjs][@kingjs]/[linq][ns0].[then-by][ns1]
Generates a sequence of elements from a sorted  sequence where elements previously considered equal are  put in ascending order according to a key.
## Usage
```js
require('kingjs');
var assert = require('assert');
var ThenBy = require('@kingjs/linq.then-by');
var OrderBy = require('@kingjs/linq.order-by');
var ToArray = require('@kingjs/linq.to-array');

function readme() {
  
  var people = [
    { first: 'Bob', last: 'Smith' },
    { first: 'Alice', last: 'Smith' },
    { first: 'Chris', last: 'King' },
  ];
  
  var lastSelector = function(x) { return x.last; }
  var firstSelector = function(x) { return x.first; }
  
  var sortedSequence = people[OrderBy](lastSelector);
  sortedSequence = sortedSequence[ThenBy](firstSelector);
 
  var sortedArray = sortedSequence[ToArray]();
  assert(sortedArray[0].last == 'King');
  assert(sortedArray[0].first == 'Chris');
  assert(sortedArray[1].last == 'Smith');
  assert(sortedArray[1].first == 'Alice');
  assert(sortedArray[2].last == 'Smith');
  assert(sortedArray[2].first == 'Bob');
}
readme();

```

## API
```ts
thenBy(keySelector, lessThan)
```

### Parameters
- `keySelector`: 
- `lessThan`: 



## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.then-by
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-enumerable`](https://www.npmjs.com/package/@kingjs/i-enumerable)|`latest`|
|[`@kingjs/i-ordered-enumerable`](https://www.npmjs.com/package/@kingjs/i-ordered-enumerable)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
## Source
https://repository.kingjs.net/linq/then-by
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/then-by)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.then-by
