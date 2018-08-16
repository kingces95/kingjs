# @[kingjs](https://www.npmjs.com/package/kingjs)/[linq](https://www.npmjs.com/package/@kingjs/linq).join
Generates a sequence of elements composed of elements from two sequences that share a common key.
## Usage 
Match people `Alice`, `Bob`, and `Chris` to their pets `Fluffy`, `Spike`, `Snuggles`, and `Butch` like this:
```js
var join = require('@kingjs/linq.join');
var sequence = require('@kingjs/sequence');
var toArray = require('@kingjs/linq.to-array');

var result = join.call(
  sequence(
    { name: `Alice`, key: 0 },
    { name: `Bob`, key: 1 },
    { name: `Chris`, key: 2 }, // no pets
  ), 
  sequence(
    { name: `Fluffy`, ownerKey: 0 },
    { name: `Spike`, ownerKey: 0 },
    { name: `Snuggles`, ownerKey: 1 },
    { name: `Butch`, ownerKey: 3 }, // no owner
  ),
  function(person) { return person.key; },
  function(animal) { return animal.ownerKey; },
  function(owner, pet) { return owner.name + ' owns ' + pet.name; },
)

toArray.call(result);
```
result:
```js
[ 
  'Alice owns Fluffy',
  'Alice owns Spike',
  'Bob owns Snuggles',
]
```
## API
```ts
declare function join(
  this: Enumerable,
  outer: Enumerable,
  innerKeySelector: (innerElement) => any,
  outerKeySelector: (outerElement) => any,
  resultSelector: (innerElement, outerElement) => any
): any
```
### Interfaces
- `Enumerable`: See [@kingjs/sequence](https://www.npmjs.com/package/@kingjs/sequence).
### Parameters
- `this`: The outer sequence.
- `inner`: The inner sequence. 
- `outerKeySelector`: Selects a key from elements of the outer sequence. 
- `innerKeySelector`: Selects a key from elements of the inner sequence.
- `resultSelector`: Composes a result element from an inner and an outer element which share a common key.
  - `innerElement`: The inner element.
  - `outerElement`: The outer element. 
### Return Value
A sequence of elements composed of elements from two sequences that share a common key.
## Remarks
Elements are deemed equal if their key's stringified representations are the same. 

Matching elements are generated in the order their inner element, then outer element, occur in their respective sequences.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.join
```
## Acknowledgments
Like [`Enumerable.Join`](https://msdn.microsoft.com/en-us/library/bb534297(v=vs.110).aspx).
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/join)