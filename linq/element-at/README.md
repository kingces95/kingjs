# @[kingjs][@kingjs]/[linq][ns0].[element-at][ns1]
Returns the element at a specified  index in a sequence.
## Usage
```js
require('kingjs');
var ElementAt = require('@kingjs/linq.element-at');
var assert = require('assert');
var assertThrows = require('@kingjs/assert-throws');

assert([0, 1, 2][ElementAt](1) == 1);

assertThrows(function() {
  [1, 2, 3][ElementAt](3)
});

assertThrows(function() {
  [1, 2, 3][ElementAt](-1)
});
```

## API
```ts
elementAt(index)
```

### Parameters
- `index`: 



## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.element-at
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-enumerable`](https://www.npmjs.com/package/@kingjs/i-enumerable)|`latest`|
|[`@kingjs/i-enumerator`](https://www.npmjs.com/package/@kingjs/i-enumerator)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
## Source
https://repository.kingjs.net/linq/element-at
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/element-at)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.element-at
