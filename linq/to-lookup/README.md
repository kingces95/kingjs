# @[kingjs](https://www.npmjs.com/package/kingjs)/[linq](https://www.npmjs.com/package/@kingjs/linq).to-lookup
Creates a dictionary from a sequence where values are groups of elements keyed by a name common to all members of the group.
## Usage 
If the following people own the following pets 
- Alice owns Fluffy
- Alice owns Spike
- Bob owns Tiger

then create a lookup from 
- Alice to Fluffy and Spike 
- Bob to Tiger 

like this:
```js
var toLookup = require('@kingjs/linq.to-lookup');
require('kingjs');
var toArray = require('@kingjs/linq.to-array');

var lookup = toLookup.call(
  sequence(
    { name: 'Alice', pet: 'Fluffy' },
    { name: 'Alice', pet: 'Spike' },
    { name: 'Bob', pet: 'Tiger' }
  ),
  function(x) { return x.name; },
  function(x) { return x.pet; }
)

for (var key in lookup)
  lookup[key] = toArray.call(lookup[key]);
  
lookup;
```
result:
```js
{
  Alice: [ 'Fluffy', 'Spike' ],
  Bob: [ 'Tiger' ]
}
```
## API
```ts
declare function(
  this: Enumerable,
  keySelector: function(x): any,
  valueSelector?: function(x): any,
): Dictionary
```
### Interfaces
- `Enumerable`: See [@kingjs/enumerable.define](https://www.npmjs.com/package/@kingjs/enumerable.define).
- `Dictionary`: See [@kingjs/dictionary](https://www.npmjs.com/package/@kingjs/dictionary).
### Parameters
- `this`: Sequence to partition into named sequences.
- `keySelector`: Selects a partition key from an element.
- `valueSelector`: Transforms an element before inclusion in a partition. By default, selects the entire element.
### Return Value
A partitioning of the sequence as a dictionary mapping partition names to partitions.  
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.to-lookup
```
## Acknowledgments
Like [Enumerable.ToLookup](https://msdn.microsoft.com/en-us/library/bb548544(v=vs.110).aspx).
## License

MIT

![Analytics](https://analytics.kingjs.net/linq/to-lookup)