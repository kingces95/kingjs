# @[kingjs][@kingjs]/[linq][ns0].[group-join][ns1]
Generates a sequence of elements composed  of an element in one sequence and a group of elements  in another sequence all of which share a common key.
## Usage
```js
require('kingjs');
var GroupJoin = require('@kingjs/linq.group-join');
var ToArray = require('@kingjs/linq.to-array');
var assert = require('assert');

function readme() {
  var owners = [
    { name: 'Alice', id: 0 },
    { name: 'Bob', id: 1 },
    { name: 'Chris', id: 2 },
  ];
  
  var pets = [
    { name: 'Fluffy', ownerId: 0 },
    { name: 'Spike', ownerId: 0 },
    { name: 'Snuggles', ownerId: 1 },
  ];
  
  var ownersAndPets = owners[GroupJoin](
    pets,
    function(x) { return x.id; },
    function(x) { return x.ownerId; },
    function(x, group) { 
      return {
        owner: x.name,
        pets: group[ToArray]()
      }; 
    }
  );
  
  var result = ownersAndPets[ToArray]();

  assert(result.length == 3);
  assert(result[0].owner == 'Alice');
  assert(result[0].pets.length == 2);
  assert(result[0].pets[0].name == 'Fluffy');
  assert(result[0].pets[0].ownerId == '0');
  assert(result[0].pets[1].name == 'Spike');
  assert(result[0].pets[1].ownerId == '0');
  assert(result[1].owner == 'Bob');
  assert(result[1].pets.length == 1);
  assert(result[1].pets[0].name == 'Snuggles');
  assert(result[1].pets[0].ownerId == '1');
  assert(result[2].owner == 'Chris');
  assert(result[2].pets.length == 0);
}
readme();

```

## API
```ts
groupJoin(innerEnumerable, outerKeySelector, innerKeySelector, resultSelector)
```

### Parameters
- `innerEnumerable`: 
- `outerKeySelector`: 
- `innerKeySelector`: 
- `resultSelector`: 



## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.group-join
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-enumerable`](https://www.npmjs.com/package/@kingjs/i-enumerable)|`latest`|
|[`@kingjs/i-enumerator`](https://www.npmjs.com/package/@kingjs/i-enumerator)|`latest`|
|[`@kingjs/linq.empty`](https://www.npmjs.com/package/@kingjs/linq.empty)|`latest`|
|[`@kingjs/linq.to-lookup`](https://www.npmjs.com/package/@kingjs/linq.to-lookup)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/reflect.implement-i-enumerable`](https://www.npmjs.com/package/@kingjs/reflect.implement-i-enumerable)|`latest`|
## Source
https://repository.kingjs.net/linq/group-join
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/group-join)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.group-join
