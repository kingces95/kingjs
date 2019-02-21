# @[kingjs](https://www.npmjs.com/package/kingjs)/[descriptor](https://www.npmjs.com/package/@kingjs/descriptor).[nested](https://www.npmjs.com/package/@kingjs/descriptor.nested).to-array
Returns an array of leaf values that correspond to as set of paths.
## Usage
Return an array of pet names like this:
```js
var toArray = require('@kingjs/descriptor.nested.to-array');

var people = {
  alice: { 
    pet: 'tiger' 
  },
  bob: { 
    pet: 'snuggles' 
  },
  chris: {
    pet: 'spike'
  }
}

var tree = {
  '*': { pet: null }
}

toArray(people, tree);
```
result:
```js
[ 'tiger', 'snuggles', 'spike' ]
```
## API
```ts
declare function toArray(
  tree: NestedDescriptor,
  paths: NestedDescriptor
): array
```
### Interfaces
- `NestedDescriptor`: see [@kingjs/descriptor/nested][nested-descriptor]
### Parameters
- `tree`: A tree whose leaf values that correspond to a path in `paths` are returned in an array.
- `paths`: Paths to search in `tree`. If the path is found, then it's value is included in the result array. Any property named `'*'` found in `paths` is replicated with properties whose names correspond to properties of `tree` not already present as siblings of `'*'`.  
### Returns
Returns an array of values or `null` if no values are found.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/descriptor.nested.to-array
```
## License
MIT

![Analytics](https://analytics.kingjs.net/descriptor/nested/to-array)

  [nested-descriptor]: https://www.npmjs.com/package/@kingjs/descriptor/nested