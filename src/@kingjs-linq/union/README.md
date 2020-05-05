# @[kingjs][@kingjs]/[linq][ns0].[union][ns1]
Generates the set union of two sequences.
## Usage
```js
require('kingjs');
var Union = require('@kingjs/linq.union');
var assert = require('assert');
var ToArray = require('@kingjs/linq.to-array');

function readme() {
  var result = [0, 0, 1, 2]
    [Union]([1, 3, 3]);
  
  result = result[ToArray]();

  assert(result.length = 4);
  assert(result[0] == 0);
  assert(result[1] == 1);
  assert(result[2] == 2);
  assert(result[3] == 3);
}
readme();

function readmeWrapped() {
  var result = [{ id: 0 }, { id: 0 }, { id: 1 }, { id: 2 }]
    [Union]([{ id: 1 }, { id: 3 }, { id: 3 }], x => x.id);
  
  result = result[ToArray]();

  assert(result.length = 4);
  assert(result[0].id == 0);
  assert(result[1].id == 1);
  assert(result[2].id == 2);
  assert(result[3].id == 3);
}
readmeWrapped();
```

## API
```ts
union(second, idSelector)
```

### Parameters
- `second`: 
- `idSelector`: 



## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.union
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
https://repository.kingjs.net/linq/union
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/union)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.union
