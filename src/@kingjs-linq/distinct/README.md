# @[kingjs][@kingjs]/[linq][ns0].[distinct][ns1]
Generates a sequence composed of the  distinct elements of another sequence.
## Usage
```js
require('kingjs');
var assert = require('assert');
var Distinct = require('@kingjs/linq.distinct');
var SequenceEquals = require('@kingjs/linq.sequence-equal');
var ToArray = require('@kingjs/linq.to-array');

function readme() {
  var enumerable = [0, 0, 1, 1, 2, 2];
  enumerable = enumerable[Distinct]();
  assert(enumerable[SequenceEquals]([0, 1, 2]));
}
readme();

function readmeId() {
  var idAndName = [
    { id: 0, name: 'foo' },
    { id: 0, name: 'bar' },
  ]

  var distinctIdAndName =
    idAndName[Distinct](x => x.id)
    [ToArray]()

  assert.deepEqual(distinctIdAndName, [{ id: 0, name: 'foo' }]);
}
readmeId();

function dictionaryTest() {
  var enumerable = 'toString';
  enumerable = enumerable[Distinct]();
  enumerable = enumerable[ToArray]()
  assert(enumerable[SequenceEquals]('toSring'));
}
dictionaryTest();
```

## API
```ts
distinct(selectId)
```

### Parameters
- `selectId`: 



## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.distinct
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-enumerable`](https://www.npmjs.com/package/@kingjs/i-enumerable)|`latest`|
|[`@kingjs/linq.except`](https://www.npmjs.com/package/@kingjs/linq.except)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
## Source
https://repository.kingjs.net/linq/distinct
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/distinct)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.distinct
