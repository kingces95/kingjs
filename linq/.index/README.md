# @[kingjs](https://www.npmjs.com/package/kingjs)/linq
Exports all `@kingjs/linq.*` functionality in one package.
## Usage
Join pets to their owners, sorted by last name, then first name, excluding fishes, like this:
```js
var linq = require('@kingjs/linq');
var sequence = require('@kingjs/enumerable.create');
var apply = require('@kingjs/apply');

var people = sequence(
  { firstName: 'Bob', lastName: 'Smith', id: 0 },
  { firstName: 'Alice', lastName: 'Smith', id: 1 },
  { firstName: 'Chris', lastName: 'King', id: 2 },
);

var pets = sequence(
  { name: 'Tiger', type: 'dog', ownerId: 0 },
  { name: 'Spike', type: 'dog', ownerId: 0 },
  { name: 'Fluffy', type: 'cat', ownerId: 1 },
  { name: 'Bubbles', type: 'fish', ownerId: 2 },
);

apply.call(people,
  linq.orderBy, [ function(x) { return x.lastName; } ],
  linq.thenBy, [ function(x) { return x.firstName; } ],
  linq.join, [
    pets, 
    function(x) { return x.id; },
    function(x) { return x.ownerId; },
    function(owner, pet) { return { owner: owner, pet: pet } }
  ],
  linq.where, [ function(x) { return x.pet.type != 'fish'; } ],
  linq.select, [
    function(x) { 
      var owner = x.owner;
      var pet = x.pet;

      return owner.firstName + " " + owner.lastName + 
        ' owns a ' + pet.type + ' named ' + pet.name + '.';
    },
  ],
  linq.toArray, [],
  Array.prototype.join, ['\n']
);
```
result:
```js
Alice Smith owns a cat named Fluffy. 
Bob Smith owns a dog named Tiger. 
Bob Smith owns a dog named Spike.
```
## API
| Search | Aggregate | Set | Generator | Accrete |
|---|---|---|---|---|
|[`all`][all]|[`aggregate`][aggregate]|[`distinct`][distinct]|[`range`][range]|[`append`][append]|
|[`any`][any]|[`average`][average]|[`except`][except]|[`repeat`][repeat]|[`concat`][concat]|
|[`contains`][contains]|[`count`][count]|[`intersect`][intersect]|[`empty`][empty]|[`prepend`][prepend]|
|[`elementAt`][element-at][`OrUndef`][element-at-]|[`max`][max]|[`union`][union]|
|[`first`][first][`OrUndef`][first-]|[`min`][min]||
|[`last`][last][`OrUndef`][last-]|[`sum`][sum]|
|[`single`][single][`OrUndef`][single-]|[`equal`][sequence-equal]

| Sort | Filter | Join | Transform | Container |
|---|---|---|---|---|
|[`orderBy`][order-by]|[`skip`][skip]|[`groupBy`][group-by]|[`select`][select]|[`toArray`][to-array]|
|[`orderByDesc`][order-by-]|[`skipWhile`][skip-while]|[`groupJoin`][group-join]|[`selectMany`][select-many]|[`toDictionary`][to-dictionary]|
|[`thenBy`][then-by]|[`take`][take]|[`join`][join]||[`toLookup`][to-lookup]|
|[`thenByDesc`][then-by-]|[`takeWhile`][take-while]|[`zip`][zip]|
||[`where`][where]|

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/link
```
## See Also
- [@kingjs/apply](https://www.npmjs.com/package/@kingjs/apply)
- [@kingjs/enumerable.define](https://www.npmjs.com/package/@kingjs/enumerable.define)
- [@kingjs/make-enumerable](https://www.npmjs.com/package/@kingjs/make-enumerable)
- [@kingjs/define-generator](https://www.npmjs.com/package/@kingjs/define-generator)
## Acknowledgments
Like [LINQ](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/linq/getting-started-with-linq).
## License
MIT

![Analytics](https://analytics.kingjs.net/linq)

  [aggregate]: https://www.npmjs.com/package/@kingjs/linq.aggregate
  [all]: https://www.npmjs.com/package/@kingjs/linq.all
  [any]: https://www.npmjs.com/package/@kingjs/linq.any
  [append]: https://www.npmjs.com/package/@kingjs/linq.append
  [average]: https://www.npmjs.com/package/@kingjs/linq.average
  [concat]: https://www.npmjs.com/package/@kingjs/linq.concat
  [contains]: https://www.npmjs.com/package/@kingjs/linq.contains
  [count]: https://www.npmjs.com/package/@kingjs/linq.count
  [distinct]: https://www.npmjs.com/package/@kingjs/linq.distinct
  [element-at]: https://www.npmjs.com/package/@kingjs/linq.element-at
  [element-at-]: https://www.npmjs.com/package/@kingjs/linq.element-at-or-undefined
  [empty]: https://www.npmjs.com/package/@kingjs/linq.empty
  [except]: https://www.npmjs.com/package/@kingjs/linq.except
  [first]: https://www.npmjs.com/package/@kingjs/linq.first
  [first-]: https://www.npmjs.com/package/@kingjs/linq.first-or-undefined
  [group-by]: https://www.npmjs.com/package/@kingjs/linq.group-by
  [group-join]: https://www.npmjs.com/package/@kingjs/linq.group-join
  [intersect]: https://www.npmjs.com/package/@kingjs/linq.intersect
  [join]: https://www.npmjs.com/package/@kingjs/linq.join
  [last]: https://www.npmjs.com/package/@kingjs/linq.last
  [last-]: https://www.npmjs.com/package/@kingjs/linq.last-or-undefined
  [max]: https://www.npmjs.com/package/@kingjs/linq.max
  [min]: https://www.npmjs.com/package/@kingjs/linq.min
  [order-by]: https://www.npmjs.com/package/@kingjs/linq.order-by
  [order-by-]: https://www.npmjs.com/package/@kingjs/linq.order-by-descending
  [prepend]: https://www.npmjs.com/package/@kingjs/linq.prepend
  [range]: https://www.npmjs.com/package/@kingjs/linq.range
  [repeat]: https://www.npmjs.com/package/@kingjs/linq.repeat
  [select]: https://www.npmjs.com/package/@kingjs/linq.select
  [select-many]: https://www.npmjs.com/package/@kingjs/linq.select-many
  [sequence-equal]: https://www.npmjs.com/package/@kingjs/linq.sequence-equal
  [single]: https://www.npmjs.com/package/@kingjs/linq.single
  [single-]: https://www.npmjs.com/package/@kingjs/linq.single-or-undefined
  [skip]: https://www.npmjs.com/package/@kingjs/linq.skip
  [skip-while]: https://www.npmjs.com/package/@kingjs/linq.skip-while
  [sum]: https://www.npmjs.com/package/@kingjs/linq.sum
  [take]: https://www.npmjs.com/package/@kingjs/linq.take
  [take-while]: https://www.npmjs.com/package/@kingjs/linq.take-while
  [then-by]: https://www.npmjs.com/package/@kingjs/linq.then-by
  [then-by-]: https://www.npmjs.com/package/@kingjs/linq.then-by-descending
  [to-array]: https://www.npmjs.com/package/@kingjs/linq.to-array
  [to-dictionary]: https://www.npmjs.com/package/@kingjs/linq.to-dictionary
  [to-lookup]: https://www.npmjs.com/package/@kingjs/linq.to-lookup
  [union]: https://www.npmjs.com/package/@kingjs/linq.union
  [where]: https://www.npmjs.com/package/@kingjs/linq.where
  [zip]: https://www.npmjs.com/package/@kingjs/linq.zip