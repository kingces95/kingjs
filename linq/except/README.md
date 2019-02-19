# @[kingjs][@kingjs]/[linq][ns0].[except][ns1]
Generates the set difference of two sequences.
## Usage
```js
require('kingjs')
var Except = require('@kingjs/linq.except');
var assert = require('assert');
var SequenceEquals = require('@kingjs/linq.sequence-equal');
var ToArray = require('@kingjs/linq.to-array');

assert(
  [0, 0, 1, 2]
    [Except]([1, 2])
    [SequenceEquals]([0])
);

var idAndName = [
  { id: 0, name: 'foo' },
  { id: 0, name: 'bar' },
  { id: 1, name: 'baz' },
];

var distinctIdAndName = 
  idAndName[Except](
    [{ id: 1, name: 'baz' }],
    function selectName(x) { return x.id; }
  )
  [ToArray]();

assert.deepEqual(distinctIdAndName, [
  { id: 0, name: 'foo' },
])
```

## API
```ts
except(enumerable, idSelector)
```

### Parameters
- `enumerable`: 
- `idSelector`: 



## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.except
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
https://repository.kingjs.net/linq/except
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/except)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.except
