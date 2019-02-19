# @[kingjs][@kingjs]/[linq][ns0].[take][ns1]
Generates a sequence identical to  another sequence up to a specified index.
## Usage
```js
require('kingjs');
var take = require('@kingjs/linq.take');
var assert = require('assert');
var toArray = require('@kingjs/linq.to-array');

function readme() {
  var result = take.call(sequence(-2, -1, 0, 1, 2), 2);
  var array = toArray.call(result);

  assert(array.length == 2);
  assert(array[0] == -2);
  assert(array[1] == -1);
}
readme();
```

## API
```ts
take(count)
```

### Parameters
- `count`: 



## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.take
```

## Source
https://repository.kingjs.net/linq/take
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/take)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.take
