# @[kingjs](https://www.npmjs.com/package/kingjs)/[descriptor](https://www.npmjs.com/package/@kingjs/descriptor).[nested](https://www.npmjs.com/package/@kingjs/descriptor.nested).[array](https://www.npmjs.com/package/@kingjs/descriptor.nested.array).for-each
Invokes a callback on each value of a array tree.
## Usage
Replace the name of the person followed with the object representing the person being followed like this:
```js
var forEach = require('@kingjs/descriptor.nested.array.for-each');

var tree = [['bob'], 'chris', 'alice'];

var result = { };
forEach(
  tree,
  x => result[x] = true
)
```
result:
```js
[
  bob: true,
  chris: true,
  alice: true
]
```
## API
```ts
declare function forEach(
  tree: NestedDescriptor,
  callback: (value) => any,
  thisArg?
)
```
### Interfaces
- `NestedArray`: see [@kingjs/descriptor/nested/array][nested-array-descriptor]
- `NestedDescriptor`: see [@kingjs/descriptor][nested-descriptor]
### Parameters
- `tree`: The array tree whose values are going to be updated.
- `callback`: Used to update values of `tree`:
  - `value`: The current value.
- `thisArg`: The `this` argument to pass to `callback`.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/descriptor.nested.array.for-each
```
## License
MIT

![Analytics](https://analytics.kingjs.net/descriptor/nested/array/for-each)

[nested-array-descriptor]: https://www.npmjs.com/package/@kingjs/descriptor/nested/array  
[nested-descriptor]: https://www.npmjs.com/package/@kingjs/descriptor/nested