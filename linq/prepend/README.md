# @[kingjs][@kingjs]/[linq][ns0].[prepend][ns1]
Generates an sequence identical to another  sequence but with a value added to the start.
## Usage
```js
require('kingjs');
var prepend = require('@kingjs/linq.prepend');
var assert = require('assert');
var toArray = require('@kingjs/linq.to-array');
var sequenceEqual = require('@kingjs/linq.sequence-equal');

function readme() {
  var numbers = [1, 2, 3];

  var result = prepend.call(numbers, 0);

  var array = toArray.call(result);

  assert(
    sequenceEqual.call(
      sequence(0, 1, 2, 3),
      sequence.apply(this, array)
    )
  );
}
readme();
```

## API
```ts
prepend(value)
```

### Parameters
- `value`: 



## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.prepend
```

## Source
https://repository.kingjs.net/linq/prepend
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/prepend)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.prepend
