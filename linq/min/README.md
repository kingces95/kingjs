# @[kingjs][@kingjs]/[linq][ns0].[min][ns1]
Returns the minimum value in a sequence of values  projected from elements of a sequence.
## Usage
```js
require('kingjs');
var Min = require('@kingjs/linq.min');
var assert = require('assert');

function readme() {
  assert([1, 2, 3][Min]() == 1);
}
readme();

function readmePredicate() {
  var compareAge = function(l, r) {
     return l.age < r.age; 
  }
  
  var person = [
    { name: 'Alice', age: 18 },
    { name: 'Bob', age: 18 },
    { name: 'Chris', age: 19 },
  ][Min](compareAge);

  assert(person.name == 'Alice');
  assert(person.age == 18);
}
readmePredicate();

```

## API
```ts
min(lessThan)
```

### Parameters
- `lessThan`: 



## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.min
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-enumerable`](https://www.npmjs.com/package/@kingjs/i-enumerable)|`latest`|
|[`@kingjs/i-enumerator`](https://www.npmjs.com/package/@kingjs/i-enumerator)|`latest`|
|[`@kingjs/linq.default-less-than`](https://www.npmjs.com/package/@kingjs/linq.default-less-than)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
## Source
https://repository.kingjs.net/linq/min
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/min)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.min
