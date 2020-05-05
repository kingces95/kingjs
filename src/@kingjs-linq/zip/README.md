# @[kingjs][@kingjs]/[linq][ns0].[zip][ns1]
Generates a sequence of elements composed  of elements of two sequences which share the same index.
## Usage
```js
require('kingjs');
var Zip = require('@kingjs/linq.zip');
var ToArray = require('@kingjs/linq.to-array');
var assert = require('assert');

function readme() {
  
  var result = [0, 1, 2][Zip](
    [`a`, `b`],
    function(n, l) { 
      return { number: n, letter: l }; 
    }
  )
  
  var result = result[ToArray]();

  assert(result.length == 2);
  assert(result[0].number == 0);
  assert(result[0].letter == 'a');
  assert(result[1].number == 1);
  assert(result[1].letter == 'b');
}
readme();

function readmeFlipped() {
  
  var result = [`a`, `b`][Zip](
    [0, 1, 2],
    function(l, n) { 
      return { number: n, letter: l }; 
    }
  )
  
  var result = result[ToArray]();

  assert(result.length == 2);
  assert(result[0].number == 0);
  assert(result[0].letter == 'a');
  assert(result[1].number == 1);
  assert(result[1].letter == 'b');
}
readmeFlipped();
```

## API
```ts
zip(other, result)
```

### Parameters
- `other`: 
- `result`: 



## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.zip
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-enumerable`](https://www.npmjs.com/package/@kingjs/i-enumerable)|`latest`|
|[`@kingjs/i-enumerator`](https://www.npmjs.com/package/@kingjs/i-enumerator)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/reflect.implement-i-enumerable`](https://www.npmjs.com/package/@kingjs/reflect.implement-i-enumerable)|`latest`|
## Source
https://repository.kingjs.net/linq/zip
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/zip)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.zip
