# @[kingjs](https://www.npmjs.com/package/kingjs)/[descriptor](https://www.npmjs.com/package/@kingjs/descriptor).[nested](https://www.npmjs.com/package/@kingjs/descriptor.nested).[array](https://www.npmjs.com/package/@kingjs/descriptor.nested.array).to-array
Returns an array values found in an array tree.
## Usage
Return an array of pet names like this:
```js
var toArray = require('@kingjs/descriptor.nested.array.to-array');

toArray([
  'a', [
    'b', [
      'c'
    ], 'd'
  ], 'e'
]);
```
result:
```js
[ 'a', 'b', 'c', 'd', 'e' ]
```
## API
```ts
declare function toArray(
  tree: NestedArray,
): array
```
### Interfaces
- `NestedArray`: see [@kingjs/descriptor/nested/array][nested-array-descriptor]
### Parameters
- `tree`: An array tree.
### Returns
Returns an array of values or `null` if no values are found.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/descriptor.nested.array.to-array
```
## License
MIT

![Analytics](https://analytics.kingjs.net/descriptor/nested/array/to-array)

[nested-array-descriptor]: https://www.npmjs.com/package/@kingjs/descriptor/nested/array  
