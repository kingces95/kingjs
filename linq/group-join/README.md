# @[kingjs](https://www.npmjs.com/package/kingjs)/[linq](https://www.npmjs.com/package/@kingjs/linq).group-join
Generates a sequence of elements composed of an element in one sequence and a group of elements in another sequence all of which share a common key.
## Usage
Join

- `Alice` with her pets `Fluffy` and `Spike`,
- `Bob` with his pet `Snuggles`, and
- `Chris` without any pets

like this:
```js
var groupJoin = require('@kingjs/linq.group-join');
require('kingjs');
var toArray = require('@kingjs/linq.to-array');

var owners = sequence(
  { name: 'Alice', id: 0 },
  { name: 'Bob', id: 1 },
  { name: 'Chris', id: 2 },
);

var pets = sequence(
  { name: 'Fluffy', ownerId: 0 },
  { name: 'Spike', ownerId: 0 },
  { name: 'Snuggles', ownerId: 1 },
)

var ownersAndPets = groupJoin.call(
  owners,
  pets,
  function(x) { return x.id; },
  function(x) { return x.ownerId; },
  function(x, group) { 
    return {
      owner: x.name,
      pets: toArray.call(group)
    }; 
  }
);

toArray.call(ownersAndPets);
```
result:
```js
[{
  owner: 'Alice', 
  pets: [
    { name: 'Fluffy', ownerId: 0 },
    { name: 'Spike', ownerId: 0 },
  ],
}, {
  owner: 'Bob', 
  pets: [
    { name: 'Snuggles', ownerId: 1 },
  ],
}, {
  owner: 'Chris', 
  pets: [     
  ],
}]
```
## API
```ts
declare function groupJoin(
  this: Enumerable,
  outerEnumerable: Enumerable,
  innerKeySelector: (x) => any,
  outerKeySelector: (x) => any,
  resultSelector: (innerElement, outerPartition) => any
)
```
### Interfaces
- `Enumerable`: See [@kingjs/enumerable.define](https://www.npmjs.com/package/@kingjs/enumerable.define).
### Parameters
- `this`: The inner sequence whose elements are matched with a partition of the outer sequence.
- `outerEnumerable`: The outer sequence whose partitions are joined with elements of the inner sequence. 
- `innerKeySelector`: Selects a key from elements of the inner sequence.
- `outerKeySelector`: Selects a key from an element of the outer sequence which specifies the named partition to which the element belongs. 
- `resultSelector`: Joins inner elements to an outer partition which shares the same key.
  - `innerElement`: An inner element.
  - `outerPartition`: The outer partition that shares the same key as the inner element. 
### Return Value
A sequence of inner elements joined to partitions of outer elements.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.group-join
```
## Acknowledgments
Like [`Enumerable.GroupJoin`](https://msdn.microsoft.com/en-us/library/bb534297(v=vs.110).aspx).
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/group-join)