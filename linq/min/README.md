# @[kingjs][@kingjs]/[linq][ns0].[min][ns1]
Returns the minimum value in a sequence of values  projected from elements of a sequence.
## Usage
```js
require('kingjs');
var min = require('@kingjs/linq.min');
var assert = require('assert');

function readme() {
  assert(min.call([1, 2, 3]) == 1);
}
readme();

function readmePredicate() {
  var compareAge = function(l, r) {
     return l.age < r.age; 
  }
  
  var person = min.call(sequence(
    { name: 'Alice', age: 18 },
    { name: 'Bob', age: 18 },
    { name: 'Chris', age: 19 },
  ), compareAge);

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

## Source
https://repository.kingjs.net/linq/min
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/min)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.min
