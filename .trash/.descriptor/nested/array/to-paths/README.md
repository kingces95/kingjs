# @[kingjs](https://www.npmjs.com/package/kingjs)/[descriptor](https://www.npmjs.com/package/@kingjs/descriptor).[nested](https://www.npmjs.com/package/@kingjs/descriptor.nested).[array](https://www.npmjs.com/package/@kingjs/descriptor.nested.array).to-paths
Returns paths constructed of nodes that satisfy a predicate.
## Usage
Return an array of pet names like this:
```js
var toPaths = require('@kingjs/descriptor.nested.array.to-paths');

  var pets = [
    ['tiger'],
    ['snuggles'], 
    ['spike'],
  ];
  
  var result = toPaths(
    pets, 
    null
  );
```
result:
```js
{
  '0': { '0': null },
  '1': { '0': null },
  '2': { '0': null },
}
```
## API
```ts
declare function toPaths(
  tree: NestedArray,
  value?: any
): NestedDescriptor
```
### Interfaces
- `NestedArray`: see [@kingjs/descriptor/nested/array][nested-array-descriptor]
- `NestedDescriptor`: see [@kingjs/descriptor/nested][nested-descriptor]
### Parameters
- `tree`: An array tree whose paths are returned.
- `value`: Optional leaf value.
### Returns
Returns paths of the array tree.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/descriptor.nested.array.to-paths
```
## License
MIT

![Analytics](https://analytics.kingjs.net/descriptor/nested/array/to-paths)

  [nested-array-descriptor]: https://www.npmjs.com/package/@kingjs/descriptor/nested/array
  [nested-descriptor]: https://www.npmjs.com/package/@kingjs/descriptor/nested