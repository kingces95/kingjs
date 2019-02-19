# @[kingjs][@kingjs]/[linq][ns0].[to-dictionary][ns1]
Creates a dictionary from a sequence where the  dictionary keys and values are projected from each element.
## Usage
```js
require('kingjs');
var ToDictionary = require('@kingjs/linq.to-dictionary');
var assert = require('assert');

function readme() {
  var result = [
    { name: 'Alice', age: 18 },
    { name: 'Bob', age: 19 },
    { name: 'Chris', age: 20 },
  ][ToDictionary](
    function(x) { return x.name; },
    function(x) { return x.age; }
  );

  assert(!('toString' in result));
  assert(Object.keys(result).length == 3);
  assert(result.Alice == 18);
  assert(result.Bob == 19);
  assert(result.Chris == 20);
}
readme();

function defaultValueSelector() {
  var result = [
    { name: 'Alice', age: 18 },
    { name: 'Bob', age: 19 },
    { name: 'Chris', age: 20 },
  ][ToDictionary](
    function(x) { return x.name; }
    // test default valueSelector
  );

  assert(!('toString' in result));
  assert(Object.keys(result).length == 3);
  assert(result.Alice.age == 18);
  assert(result.Bob.age == 19);
  assert(result.Chris.age == 20);
}
defaultValueSelector();

assert.throws(function() {
  [0, 0][ToDictionary](
    function(x) { return x; }
  )
})

```

## API
```ts
toDictionary(keySelector, valueSelector)
```

### Parameters
- `keySelector`: 
- `valueSelector`: 



## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.to-dictionary
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/dictionary`](https://www.npmjs.com/package/@kingjs/dictionary)|`latest`|
|[`@kingjs/i-enumerable`](https://www.npmjs.com/package/@kingjs/i-enumerable)|`latest`|
|[`@kingjs/linq.aggregate`](https://www.npmjs.com/package/@kingjs/linq.aggregate)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
## Source
https://repository.kingjs.net/linq/to-dictionary
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/to-dictionary)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.to-dictionary
