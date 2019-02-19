# @[kingjs][@kingjs]/[linq][ns0].[order-by][ns1]
Generates a sequence of elements in ascending  order according to a key.
## Usage
```js
require('kingjs');
var assert = require('assert');
var OrderBy = require('@kingjs/linq.order-by');
var ToArray = require('@kingjs/linq.to-array');

function readme() {
  var numbers = [1, 0, 2];
  var sortedSequence = numbers[OrderBy]();
  var sortedArray = sortedSequence[ToArray]();

  assert(sortedArray[0] == 0);
  assert(sortedArray[1] == 1);
  assert(sortedArray[2] == 2);
}
readme();

function readmeWrapped() {

  var numbers = [{ value: 1 }, { value: 0 }, { value: 2 }];
  var selectValue = function(x) { return x.value; };
  var sortedSequence = numbers[OrderBy](selectValue);
  var sortedArray = sortedSequence[ToArray]();

  assert(sortedArray[0].value == 0);
  assert(sortedArray[1].value == 1);
  assert(sortedArray[2].value == 2);
}
readmeWrapped();

function readmeComp() {
  var numbers = [1, 0, 2, 'b', 'a'];
  var sortedSequence = numbers[OrderBy](
    null, 
    function(l, r) {
      if (typeof l != typeof r)
        return typeof l == 'string';
      return l < r;
    }
  );
  var sortedArray = sortedSequence[ToArray]();

  assert(sortedArray[0] == 'a');
  assert(sortedArray[1] == 'b');
  assert(sortedArray[2] == 0);
  assert(sortedArray[3] == 1);
  assert(sortedArray[4] == 2);
}
readmeComp();

function readmeDesc() {
  var numbers = [1, 0, 2];
  var sortedSequence = numbers[OrderBy](null, null, true);
  var sortedArray = sortedSequence[ToArray]();

  assert(sortedArray[0] == 2);
  assert(sortedArray[1] == 1);
  assert(sortedArray[2] == 0);
}
readmeDesc();

function readmeThen() {
  var people = [
    { first: 'Bob', last: 'Smith' },
    { first: 'Alice', last: 'Smith' },
    { first: 'Chris', last: 'King' },
  ];

  var lastSelector = function(x) { return x.last; }
  var firstSelector = function(x) { return x.first; }

  var sortedSequence = people[OrderBy](lastSelector)
    .createOrderedEnumerable(firstSelector);

  var sortedArray = sortedSequence[ToArray]();
  assert(sortedArray[0].last == 'King');
  assert(sortedArray[0].first == 'Chris');
  assert(sortedArray[1].last == 'Smith');
  assert(sortedArray[1].first == 'Alice');
  assert(sortedArray[2].last == 'Smith');
  assert(sortedArray[2].first == 'Bob');
}
readmeThen();

```

## API
```ts
orderBy(keySelector, lessThan, descending_, stack_)
```

### Parameters
- `keySelector`: 
- `lessThan`: 
- `descending_`: 
- `stack_`: 



## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.order-by
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-enumerable`](https://www.npmjs.com/package/@kingjs/i-enumerable)|`latest`|
|[`@kingjs/i-enumerator`](https://www.npmjs.com/package/@kingjs/i-enumerator)|`latest`|
|[`@kingjs/linq.default-less-than`](https://www.npmjs.com/package/@kingjs/linq.default-less-than)|`latest`|
|[`@kingjs/linq.to-array`](https://www.npmjs.com/package/@kingjs/linq.to-array)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
## Source
https://repository.kingjs.net/linq/order-by
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/order-by)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.order-by
