# @[kingjs][@kingjs]/[linq][ns0].[prepend][ns1]
Generates an sequence identical to another  sequence but with a value added to the start.
## Usage
```js
require('kingjs');
var assert = require('assert');
var Prepend = require('@kingjs/linq.prepend');
var SequenceEqual = require('@kingjs/linq.sequence-equal');
var ToArray = require('@kingjs/linq.to-array');

function readme() {
  var numbers = [1, 2, 3];
  var result = numbers[Prepend](0);
  var array = result[ToArray]();

  assert(
    [0, 1, 2, 3][SequenceEqual](array)
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
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/assert-shimmed`](https://www.npmjs.com/package/@kingjs/assert-shimmed)|`latest`|
|[`@kingjs/i-enumerable`](https://www.npmjs.com/package/@kingjs/i-enumerable)|`latest`|
|[`@kingjs/linq.concat`](https://www.npmjs.com/package/@kingjs/linq.concat)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
## Source
https://repository.kingjs.net/linq/prepend
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/prepend)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.prepend
