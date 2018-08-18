# @[kingjs](https://www.npmjs.com/package/kingjs)/[linq](https://www.npmjs.com/package/@kingjs/linq).group-by
Generates a sequence of groups composed of elements of another sequence which share a common key.
## Usage
Group `0`, `1`, `2`, `3` by even/odd numbers like this:
```js
var groupBy = require('@kingjs/linq.group-by');
var sequence = require('@kingjs/enumerable.create');
var toArray = require('@kingjs/linq.to-array');

var evenOdd = groupBy.call(
  sequence(0, 1, 2, 3), 
  function(x) { return x % 2; }
);

var groups = toArray.call(evenOdd);
var even = groups[0];
var odd = groups[1];

var result = {
  evenKey: even.key,
  even: toArray.call(even),
  oddKey: odd.key,
  odd: toArray.call(odd),
};

result;
```
result:
```js
{
  evenKey: 0,
  even: [ 0, 2 ],
  oddKey: 0,
  odd: [ 1, 3 ],
}
```
Group people by their age and project their names like this:
```js
var groupBy = require('@kingjs/linq.group-by');
var sequence = require('@kingjs/enumerable.create');
var toArray = require('@kingjs/linq.to-array');

var people = groupBy.call(
  sequence(
    { name: 'Alice', age: 17 },
    { name: 'Bob', age: 16 },
    { name: 'Chris', age: 30 }
  ), 
  function(x) { return x.age <= 18; }, // key selector
  function(x) { return x.name; }, // element selector
  function(group) {  // result selector
    return 'Under 18: ' + group.key + '; ' + toArray.call(group).join(', ');
  },
);

toArray.call(people);
```
result:
```js
[
  'Under 18: true; Alice, Bob',
  'Under 18: false; Chris'
]
```

## API
```ts
declare function groupBy(
  this: Enumerable,
  keySelector: (x) => any,
  elementSelector?: (x) => any,
  resultSelector?: (group) => any
)
```

### Interfaces
- `Enumerable`: See [@kingjs/enumerable.define](https://www.npmjs.com/package/@kingjs/enumerable.define).

### Parameters
- `this`: The sequence to partition.
- `keySelector`: Selects key common to each group. 
- `elementSelector`: Maps an element before inclusion in a group. 
- `resultSelector`: Maps a group before returned.
  - `group`: Sequence of elements in the group.  

### Return Value
Sequence of sub-sequences where each sub-sequence contains elements forming a group. Each group has a `key` property whose value was selected by `keySelector` and is shared by elements of the group.

## Install
With [npm](https://npmjs.org/) installed, run

```
$ npm install @kingjs/linq.group-by
```

## Acknowledgments
Like [`Enumerable.GroupBy`](https://msdn.microsoft.com/en-us/library/bb535049(v=vs.110).aspx).

## License

MIT

![Analytics](https://analytics.kingjs.net/linq/group-by)