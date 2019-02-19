# @[kingjs][@kingjs]/[linq][ns0].[last-or-undefined][ns1]
Returns the last element of a sequence  that satisfies a specified condition or a undefined.
## Usage
```js
require('kingjs');
var lastOrUndefined = require('@kingjs/linq.last-or-undefined');
var assert = require('assert');

function readme() {
  assert(lastOrUndefined.call([1, 2, 3]) == 2);
  assert(lastOrUndefined.call(sequence()) == undefined);
}
readme();

function readmePredicate() {
  var isOdd = function(x) { return x % 2 == 1; }
  assert(lastOrUndefined.call(sequence(0, 1, 2, 3, 4), isOdd) == 3);
  assert(lastOrUndefined.call(sequence(0, 2), isOdd) == undefined);
}
readmePredicate();

```

## API
```ts
lastOrUndefined(predicate)
```

### Parameters
- `predicate`: 



## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.last-or-undefined
```

## Source
https://repository.kingjs.net/linq/last-or-undefined
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/last-or-undefined)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.last-or-undefined
