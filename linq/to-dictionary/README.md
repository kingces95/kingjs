# @[kingjs][@kingjs]/[linq][ns0].[to-dictionary][ns1]
Creates a dictionary from a sequence where the  dictionary keys and values are projected from each element.
## Usage
```js
require('kingjs');
var toDictionary = require('@kingjs/linq.to-dictionary');
var assert = require('assert');
var assertThrows = require('@kingjs/assert-throws');

function readme() {
  var result = toDictionary.call(
    sequence(
      { name: 'Alice', age: 18 },
      { name: 'Bob', age: 19 },
      { name: 'Chris', age: 20 },
    ), 
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
  var result = toDictionary.call(
    sequence(
      { name: 'Alice', age: 18 },
      { name: 'Bob', age: 19 },
      { name: 'Chris', age: 20 },
    ), 
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

assertThrows(function() {
  toDictionary.call(
    sequence(0, 0), 
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

## Source
https://repository.kingjs.net/linq/to-dictionary
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/to-dictionary)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.to-dictionary
