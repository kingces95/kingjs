# @[kingjs][@kingjs]/[linq][ns0].[skip][ns1]
Generates a sequence identical to another sequence  after bypassing a specified number of elements.
## Usage
```js
require('kingjs');
var skip = require('@kingjs/linq.skip');
var assert = require('assert');
var toArray = require('@kingjs/linq.to-array');

function readme() {
  var result = skip.call(sequence(-2, -1, 0, 1, 2), 2);
  var array = toArray.call(result);

  assert(array.length == 3);
  assert(array[0] == 0);
  assert(array[1] == 1);
  assert(array[2] == 2);
}
readme();
```

## API
```ts
skip(count)
```

### Parameters
- `count`: 



## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.skip
```

## Source
https://repository.kingjs.net/linq/skip
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/skip)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.skip
