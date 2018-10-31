# @[kingjs](https://www.npmjs.com/package/kingjs)/[descriptor](https://www.npmjs.com/package/@kingjs/descriptor).[nested](https://www.npmjs.com/package/@kingjs/descriptor.nested).to-paths
Returns paths constructed of nodes that satisfy a predicate.
## Usage
Return an array of pet names like this:
```js
var toPaths = require('@kingjs/descriptor.nested.to-paths');

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
};

var result = toPaths(
  people, 
  x => x instanceof Object, 
  null
);
```
result:
```js
{
  { 
    alice: { pet: null },
    bob: { pet: null },
    chris: { pet: null },
  }
}
```
## API
```ts
declare function toPaths(
  tree: NestedDescriptor,
  predicate: () => boolean,
  value?: any
): NestedDescriptor
```
### Interfaces
- `NestedDescriptor`: see [@kingjs/descriptor/nested][nested-descriptor]
### Parameters
- `tree`: A tree from which a subtree worth of nodes is selected that satisfy a predicate.
- `predicate`: Selects which nodes to include in the subtree.
- `value`: Optional leaf value.
### Returns
Returns an subtree of `tree` where each node satisfies the `predicate`.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/descriptor.nested.to-paths
```
## License
MIT

![Analytics](https://analytics.kingjs.net/descriptor/nested/to-paths)

  [nested-descriptor]: https://www.npmjs.com/package/@kingjs/descriptor/nested