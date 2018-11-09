# @[kingjs](https://www.npmjs.com/package/kingjs)/[descriptor](https://www.npmjs.com/package/@kingjs/descriptor).[nested](https://www.npmjs.com/package/@kingjs/descriptor.nested).update
Updates the leafs of a tree to values returned by a callback which takes the current value.
## Usage
Replace the name of the person followed with the object representing the person being followed like this:
```js
var update = require('@kingjs/descriptor.nested.update');

var people = {

  alice: {
    name: 'Alice',
    follows: 'bob'
  },
  bob: {
    name: 'Bob', 
    follows: 'chris'
  },
  chris: {
    name: 'Chris',
    follows: 'alice'
  }
};

var result = update.call(
  people,
  people,
  { '*': { follows: null } },
  function(name) { return this[name]; }
)
```
result:
```js
{
  alice: {
    name: 'Alice',
    follows: { /* bob */ }
  },
  bob: {
    name: 'Bob', 
    follows: { /* chris */ }
  },
  chris: {
    name: 'Chris',
    follows: { /* alice */ }
  }
}
```
## API
```ts
declare function update(
  tree: NestedDescriptor,
  path: NestedDescriptor,
  callback: (leaf, path, copyOnWrite: boolean) => any,
  thisArg?
): NestedDescriptor
```
### Interfaces
- `NestedDescriptor`: see [@kingjs/descriptor][descriptor]
### Parameters
- `tree`: The tree whose leafs are going to be updated.
- `path`: The paths of the values to be updated. 
- `callback`: Used to update `paths` of `tree`:
  - `leaf`: The leaf value.
  - `path`: The path value.
- `thisArg`: The `this` argument to pass to `callback`.
### Returns
Returns `tree` with updated values for the leafs found at `paths`.
## Remarks
If `this` is frozen then a copy of `this` will be created on the first write and returned instead of `this`.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/descriptor.nested.update
```
## License
MIT

![Analytics](https://analytics.kingjs.net/descriptor/nested/update)

  [descriptor]: https://www.npmjs.com/package/@kingjs/descriptor