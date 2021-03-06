# @[kingjs][@kingjs]/[linq][ns0].[group-by][ns1]
Generates a sequence of groups composed of  elements of another sequence which share a common key.
## Usage
```js
require('kingjs');
var GroupBy = require('@kingjs/linq.group-by');
var assert = require('assert');
var ToArray = require('@kingjs/linq.to-array');

function readme() {
  var evenOdd = [0, 1, 2, 3][GroupBy](
    function(x) { return x % 2; }
  );
  
  var groups = evenOdd[ToArray]();
  assert(groups.length == 2);

  var evenGroup = groups[0];
  assert(evenGroup.key == 0);

  var evenArray = evenGroup[ToArray]();
  assert(evenArray.length == 2);
  assert(evenArray[0] == 0);
  assert(evenArray[1] == 2);

  var oddGroup = groups[1];
  assert(oddGroup.key == 1);

  var oddArray = oddGroup[ToArray]();
  assert(oddArray.length == 2);
  assert(oddArray[0] == 1);
  assert(oddArray[1] == 3);
}
readme();

function readmePeople() {
  var people =  
  [{ name: 'Alice', age: 17 },
  { name: 'Bob', age: 16 },
  { name: 'Chris', age: 30 }]
  [GroupBy](
    function(x) { return x.age <= 18; }, // key selector
    function(x) { return x.name; }, // element selector
    function(group) {  // result selector
      return 'Under 18: ' + group.key + '; ' + 
      group[ToArray]().join(', ');
    },
  );
  
  var result = people[ToArray]();
  assert(result.length == 2);
  assert(result[0] == 'Under 18: true; Alice, Bob');
  assert(result[1] == 'Under 18: false; Chris');
}
readmePeople();

var numbers = [0, 1, 2, 3];
var groups = numbers[GroupBy](function(o) {
   return o % 2;
});

var array = groups[ToArray]();
assert(array.length == 2);
assert(array[0].key == 0);
assert(array[1].key == 1);

var even = array[0][ToArray]();
assert(even.length == 2);
assert(even[0] == 0);
assert(even[1] == 2);

var odd = array[1][ToArray]();
assert(odd.length == 2);
assert(odd[0] == 1);
assert(odd[1] == 3);

```

## API
```ts
groupBy(keySelector, elementSelector, resultSelector)
```

### Parameters
- `keySelector`: 
- `elementSelector`: 
- `resultSelector`: 



## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.group-by
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/dictionary`](https://www.npmjs.com/package/@kingjs/dictionary)|`latest`|
|[`@kingjs/i-enumerable`](https://www.npmjs.com/package/@kingjs/i-enumerable)|`latest`|
|[`@kingjs/i-enumerator`](https://www.npmjs.com/package/@kingjs/i-enumerator)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/reflect.implement-i-enumerable`](https://www.npmjs.com/package/@kingjs/reflect.implement-i-enumerable)|`latest`|
## Source
https://repository.kingjs.net/linq/group-by
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/group-by)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.group-by
