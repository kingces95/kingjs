# @[kingjs][@kingjs]/[linq][ns0].[intersect][ns1]
Generates the set intersection of two sequences.
## Usage
```js
require('kingjs');
var Intersect = require('@kingjs/linq.intersect');
var ToArray = require('@kingjs/linq.to-array');
var assert = require('assert');

function readme() {
  var result = [0, 0, 1, 2][Intersect]([1, 0])
  
  var result = result[ToArray]();

  assert(result.length == 2);
  assert(result[0] == 0);
  assert(result[1] == 1);
}
readme();

function readmeFlipped() {
  var result = [1, 0][Intersect]([0, 0, 1, 2])
  
  var result = result[ToArray]();

  assert(result.length == 2);
  assert(result[1] == 0);
  assert(result[0] == 1);
}
readmeFlipped();
```

## API
```ts
intersect(second, idSelector)
```

### Parameters
- `second`: 
- `idSelector`: 



## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.intersect
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
https://repository.kingjs.net/linq/intersect
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/intersect)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.intersect
