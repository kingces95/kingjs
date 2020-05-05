# @[kingjs][@kingjs]/[linq][ns0].[where][ns1]
Generates a sequence of elements composed of  elements from another sequences which satisfy a specified condition.
## Usage
```js
require('kingjs');
var assert = require('assert');
var Where = require('@kingjs/linq.where');
var ToArray = require('@kingjs/linq.to-array');

function readme() {
  var numbers = [0, 1, 2, 3];

  var isEven = function (x) { return x % 2 == 0; }

  var evenNumbers = numbers[Where](isEven);

  var result = evenNumbers[ToArray]();
  assert(result.length == 2);
  assert(result[0] == 0);
  assert(result[1] == 2);
}
readme();

function readmeIndex() {
  var letters = ['a', 'b', 'c', 'd'];

  var isEvenIndex = function (x, i) { return i % 2 == 0; }
  
  var everyOther = letters[Where](isEvenIndex);
  
  var result = everyOther[ToArray]();
  assert(result.length == 2);
  assert(result[0] == 'a');
  assert(result[1] == 'c');
}
readmeIndex();
```

## API
```ts
where(predicate)
```

### Parameters
- `predicate`: 



## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.where
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-enumerable`](https://www.npmjs.com/package/@kingjs/i-enumerable)|`latest`|
|[`@kingjs/i-enumerator`](https://www.npmjs.com/package/@kingjs/i-enumerator)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/reflect.implement-i-enumerable`](https://www.npmjs.com/package/@kingjs/reflect.implement-i-enumerable)|`latest`|
## Source
https://repository.kingjs.net/linq/where
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/where)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.where
