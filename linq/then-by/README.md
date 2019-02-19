# @[kingjs][@kingjs]/[linq][ns0].[then-by][ns1]
Generates a sequence of elements from a sorted  sequence where elements previously considered equal are  put in ascending order according to a key.
## Usage
```js
require('kingjs');
var assert = require('assert');
var thenBy = require('@kingjs/linq.then-by');
var orderBy = require('@kingjs/linq.order-by');
var toArray = require('@kingjs/linq.to-array');

function readme() {
  
  var people = sequence(
    { first: 'Bob', last: 'Smith' },
    { first: 'Alice', last: 'Smith' },
    { first: 'Chris', last: 'King' },
  );
  
  var lastSelector = function(x) { return x.last; }
  var firstSelector = function(x) { return x.first; }
  
  var sortedSequence = orderBy.call(people, lastSelector);
  sortedSequence = thenBy.call(sortedSequence, firstSelector);
 
  var sortedArray = toArray.call(sortedSequence);
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

## Source
https://repository.kingjs.net/linq/then-by
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/then-by)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.then-by
