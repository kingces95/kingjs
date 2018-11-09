# @[kingjs](https://www.npmjs.com/package/kingjs)/[descriptor](https://www.npmjs.com/package/@kingjs/descriptor).[nested](https://www.npmjs.com/package/@kingjs/descriptor.nested).[array](https://www.npmjs.com/package/@kingjs/descriptor.nested.array).update
Updates the values of a array tree to values returned by a callback which takes the current value.
## Usage
Replace the name of the person followed with the object representing the person being followed like this:
```js
var update = require('@kingjs/descriptor.nested.array.update');

var people = {

  alice: {
    name: 'Alice',
  },
  bob: {
    name: 'Bob', 
  },
  chris: {
    name: 'Chris',
  }
};

var tree = ['bob', 'chris', 'alice'];

var result = update(
  tree,
  x => people[x]
)
```
result:
```js
[
  bob: {
    name: 'Bob', 
  },
  chris: {
    name: 'Chris',
  },
  alice: {
    name: 'Alice',
  }
]
```
## API
```ts
declare function update(
  tree: NestedDescriptor,
  callback: (value) => any,
  thisArg?
): NestedDescriptor
```
### Interfaces
- `NestedArray`: see [@kingjs/descriptor/nested/array][nested-array-descriptor]
- `NestedDescriptor`: see [@kingjs/descriptor][nested-descriptor]
### Parameters
- `tree`: The array tree whose values are going to be updated.
- `callback`: Used to update values of `tree`:
  - `value`: The current value.
- `thisArg`: The `this` argument to pass to `callback`.
### Returns
Returns `tree` with updated values updated.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/descriptor.nested.array.update
```
## License
MIT

![Analytics](https://analytics.kingjs.net/descriptor/nested/array/update)

[nested-array-descriptor]: https://www.npmjs.com/package/@kingjs/descriptor/nested/array  
[nested-descriptor]: https://www.npmjs.com/package/@kingjs/descriptor/nested