# @[kingjs][@kingjs]/[linq][ns0].[select-many][ns1]
Generate a sequence by concatenating sequences  projected from elements of a sequence.
## Usage
```js
require('kingjs');
var SelectMany = require('@kingjs/linq.select-many');
var assert = require('assert');
var SequenceEqual = require('@kingjs/linq.sequence-equal');
var ToArray = require('@kingjs/linq.to-array');

function readme() {
  var peopleAndPets = [
    { name: 'Alice', pets: ['Tiger', 'Butch'] },
    { name: 'Bob', pets: ['Spike', 'Fluffy'] }
  ];

  var petOwners = peopleAndPets[SelectMany](
    function(x, i) { 
      assert(x.name != 'Alice' || i == 0);
      assert(x.name != 'Bob' || i == 1);
      return x.pets; 
    },
    function(x, p) { return x.name + ' owns ' + p; }
  )

  petOwners = petOwners[ToArray]();

  assert(
    petOwners[SequenceEqual]([
      'Alice owns Tiger', 
      'Alice owns Butch', 
      'Bob owns Spike', 
      'Bob owns Fluffy'
    ])
  )
}
readme();

function flatten() {
  var result = [[0, 1],[2, 3]][SelectMany]();
  result = result[ToArray]();
  assert(result[SequenceEqual]([0, 1, 2, 3]))
}
flatten();
```

## API
```ts
selectMany(collectionSelector, resultSelector)
```

### Parameters
- `collectionSelector`: 
- `resultSelector`: 



## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.select-many
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-enumerable`](https://www.npmjs.com/package/@kingjs/i-enumerable)|`latest`|
|[`@kingjs/i-enumerator`](https://www.npmjs.com/package/@kingjs/i-enumerator)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/reflect.implement-i-enumerable`](https://www.npmjs.com/package/@kingjs/reflect.implement-i-enumerable)|`latest`|
## Source
https://repository.kingjs.net/linq/select-many
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/select-many)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.select-many
