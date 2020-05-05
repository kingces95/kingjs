# @[kingjs][@kingjs]/[linq][ns0].[max][ns1]
Returns the maximum value in a sequence of values  projected from elements of a sequence.
## Usage
```js
require('kingjs');
var Max = require('@kingjs/linq.max');
var assert = require('assert');

function readme() {
  assert([1, 2, 3][Max]() == 3);
}
readme();

function readmePredicate() {
  var compareAge = function(l, r) {
     return l.age < r.age; 
  }
  
  var person = [
    { name: 'Alice', age: 18 },
    { name: 'Bob', age: 19 },
    { name: 'Chris', age: 19 },
  ][Max](compareAge);

  assert(person.name == 'Bob');
  assert(person.age == 19);
}
readmePredicate();

```

## API
```ts
max(lessThan)
```

### Parameters
- `lessThan`: 



## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.max
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-enumerable`](https://www.npmjs.com/package/@kingjs/i-enumerable)|`latest`|
|[`@kingjs/i-enumerator`](https://www.npmjs.com/package/@kingjs/i-enumerator)|`latest`|
|[`@kingjs/linq.default-less-than`](https://www.npmjs.com/package/@kingjs/linq.default-less-than)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
## Source
https://repository.kingjs.net/linq/max
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/max)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.max
