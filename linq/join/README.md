# @[kingjs][@kingjs]/[linq][ns0].[join][ns1]
Generates a sequence of elements composed of elements  from two sequences that share a common key.
## Usage
```js
require('kingjs');
var assert = require('assert');
var Join = require('@kingjs/linq.join');
var ToArray = require('@kingjs/linq.to-array');

function readme() {
  var result = [
      { name: `Alice`, key: 0 },
      { name: `Bob`, key: 1 },
      { name: `Chris`, key: 2 }, // no pets
    ][Join]([
      { name: `Fluffy`, ownerKey: 0 },
      { name: `Spike`, ownerKey: 0 },
      { name: `Snuggles`, ownerKey: 1 },
      { name: `Butch`, ownerKey: 3 }, // no owner
    ],
    function(person) { return person.key; },
    function(animal) { return animal.ownerKey; },
    function(owner, pet) { return owner.name + ' owns ' + pet.name; },
  )
  
  var result = result[ToArray]();

  assert(result.length == 3);
  assert(result[0] == 'Alice owns Fluffy');
  assert(result[1] == 'Alice owns Spike');
  assert(result[2] == 'Bob owns Snuggles');
}
readme();

function readmeFlipped() {
  var result = [
      { name: `Fluffy`, ownerKey: 0 },
      { name: `Spike`, ownerKey: 0 },
      { name: `Snuggles`, ownerKey: 1 },
      { name: `Butch`, ownerKey: 3 }, // no owner
    ][Join]([
      { name: `Alice`, key: 0 },
      { name: `Bob`, key: 1 },
      { name: `Chris`, key: 2 }, // no pets
    ], 
    function(animal) { return animal.ownerKey; },
    function(person) { return person.key; },
    function(owner, pet) { return owner.name + ' is owned by ' + pet.name; },
  )
  
  var result = result[ToArray]();

  assert(result.length == 3);
  assert(result[0] == 'Fluffy is owned by Alice');
  assert(result[1] == 'Spike is owned by Alice');
  assert(result[2] == 'Snuggles is owned by Bob');
}
readmeFlipped();
```

## API
```ts
join(innerEnumerable, outerKeySelector, innerKeySelector, resultSelector)
```

### Parameters
- `innerEnumerable`: 
- `outerKeySelector`: 
- `innerKeySelector`: 
- `resultSelector`: 



## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.join
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-enumerable`](https://www.npmjs.com/package/@kingjs/i-enumerable)|`latest`|
|[`@kingjs/i-enumerator`](https://www.npmjs.com/package/@kingjs/i-enumerator)|`latest`|
|[`@kingjs/linq.to-lookup`](https://www.npmjs.com/package/@kingjs/linq.to-lookup)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/reflect.implement-i-enumerable`](https://www.npmjs.com/package/@kingjs/reflect.implement-i-enumerable)|`latest`|
## Source
https://repository.kingjs.net/linq/join
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/join)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.join
