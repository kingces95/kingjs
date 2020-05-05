# @[kingjs][@kingjs]/[linq][ns0].[select][ns1]
Generates a sequence of elements composed of  elements of another sequence subject to a transform.
## Usage
```js
require('kingjs');
var assert = require('assert');
var Select = require('@kingjs/linq.select');
var SequenceEqual = require('@kingjs/linq.sequence-equal');

function readme() {
  function selectLowerCase(x) {
    return String.prototype.toLowerCase.call(x);
  }

  assert(
    ['A', 'B', 'C']
    [Select](selectLowerCase)
    [SequenceEqual](['a', 'b', 'c'])
  );
}
readme();

function appendIndex(x, i) {
  return x + i;
}

assert(
  ['A', 'B', 'C']
  [Select](appendIndex)
  [SequenceEqual](['A0', 'B1', 'C2'])
);
```

## API
```ts
select(selector)
```

### Parameters
- `selector`: 



## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.select
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-enumerable`](https://www.npmjs.com/package/@kingjs/i-enumerable)|`latest`|
|[`@kingjs/i-enumerator`](https://www.npmjs.com/package/@kingjs/i-enumerator)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/reflect.implement-i-enumerable`](https://www.npmjs.com/package/@kingjs/reflect.implement-i-enumerable)|`latest`|
## Source
https://repository.kingjs.net/linq/select
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/select)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.select
