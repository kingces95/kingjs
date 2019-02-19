# @[kingjs][@kingjs]/[linq][ns0].[repeat][ns1]
Generate a sequence of a repeated value.
## Usage
```js
require('kingjs');
var repeat = require('@kingjs/linq.repeat');
var assert = require('assert');
var sequenceEqual = require('@kingjs/linq.sequence-equal');

function test(enumerable, array) {
  assert(
    sequenceEqual.call(
      enumerable, 
      sequence.apply(this, array)
    )
  );
}

test(repeat(0, 0), []);
test(repeat(0, 3), [0, 0, 0]);
```

## API
```ts
repeat(element, count)
```

### Parameters
- `element`: 
- `count`: 



## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.repeat
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/reflect.implement-i-enumerable`](https://www.npmjs.com/package/@kingjs/reflect.implement-i-enumerable)|`latest`|
## Source
https://repository.kingjs.net/linq/repeat
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/repeat)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.repeat
