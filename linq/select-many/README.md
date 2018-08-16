# @[kingjs](https://www.npmjs.com/package/kingjs)/[linq](https://www.npmjs.com/package/@kingjs/linq).select-many
Generate a sequence by concatenating sequences projected from elements of a sequence.
## Usage
List all pets and their owners given a list of people and their pets like this:
```js
var selectMany = require('@kingjs/linq.select-many');
var sequence = require('@kingjs/sequence');
var toArray = require('@kingjs/linq.to-array');

var peopleAndPets = sequence(
  { name: 'Alice', pets: sequence('Tiger', 'Butch') },
  { name: 'Bob', pets: sequence('Spike', 'Fluffy') }
);

var petOwners = selectMany.call(
  peopleAndPets,
  function(x, i) { return x.pets; },
  function(x, p) { return x.name + ' owns ' + p; }
)

toArray.call(petOwners);
```
result:
```js
[
  'Alice owns Tiger', 
  'Alice owns Butch', 
  'Bob owns Spike', 
  'Bob owns Fluffy'
]
```

## API
```ts
function selectMany(
  this: Enumerable, 
  collectionSelector?: (x, i) => Enumerable,
  resultSelector?: (x, y) => any
): Enumerable
```
### Interfaces
- `Enumerable`: See [@kingjs/sequence](https://www.npmjs.com/package/@kingjs/sequence).

### Parameters
- `this`: A sequence each element of which can be transformed into another sequence.
- `collectionSelector`: Return a sequence given an element of `this`.
  - `x`: The element to transform into a sequence.
  - `i`: The index of the element being transformed into a sequence.
- `resultSelector`: Transform an element of the sequence derived from `x`.
  - `x`: The element transformed into a sequence of which `y` is a member.
  - `y`: The element of sequence derived from `x` to transform.

### Return Value
A flattened transformed version of the original sequence. 

## Install
With [npm](https://npmjs.org/) installed, run

```
$ npm install @kingjs/link.select-many
```

## Acknowledgments
Like [Enumerable.SelectMany](https://msdn.microsoft.com/en-us/library/bb534732(v=vs.110).aspx)

## License

MIT

![Analytics](https://analytics.kingjs.net/linq/select-many)