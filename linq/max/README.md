# @[kingjs][@kingjs]/[linq][ns0].[max][ns1]
Returns the maximum value in a sequence of values  projected from elements of a sequence.
## Usage
```js
require('kingjs');
var max = require('@kingjs/linq.max');
var assert = require('assert');

function readme() {
  assert(max.call([1, 2, 3]) == 3);
}
readme();

function readmePredicate() {
  var compareAge = function(l, r) {
     return l.age < r.age; 
  }
  
  var person = max.call(sequence(
    { name: 'Alice', age: 18 },
    { name: 'Bob', age: 19 },
    { name: 'Chris', age: 19 },
  ), compareAge);

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

## Source
https://repository.kingjs.net/linq/max
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/max)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.max
