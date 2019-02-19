# @[kingjs][@kingjs]/[linq][ns0].[element-at-or-undefined][ns1]
Returns the element at a specified index in a  sequence or undefined if the index is out of range.
## Usage
```js
require('kingjs');
var ElementAtOrDefault = require('@kingjs/linq.element-at-or-undefined');
var assert = require('assert');
var assertThrows = require('@kingjs/assert-throws');

assert([0, 1, 2][ElementAtOrDefault](1) == 1);

assert([0, 1, 2][ElementAtOrDefault](3) == undefined);

assertThrows(function() {
  [1, 2, 3][ElementAtOrDefault](-1)
});
```

## API
```ts
elementAtOrDefault(index)
```

### Parameters
- `index`: 



## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.element-at-or-undefined
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-enumerable`](https://www.npmjs.com/package/@kingjs/i-enumerable)|`latest`|
|[`@kingjs/i-enumerator`](https://www.npmjs.com/package/@kingjs/i-enumerator)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
## Source
https://repository.kingjs.net/linq/element-at-or-undefined
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/element-at-or-undefined)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.element-at-or-undefined
