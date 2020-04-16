# @[kingjs](https://www.npmjs.com/package/kingjs)/[descriptor](https://www.npmjs.com/package/@kingjs/descriptor).[nested](https://www.npmjs.com/package/@kingjs/descriptor.nested).for-each
Invoke a callback for each path.
## Usage
Create a new descriptor with pet names for property names like this:
```js
'use strict';

var forEach = require('@kingjs/descriptor.nested.for-each');

var values = {
  alice: {
    pet: { name: 'tiger' }
  },
  bob: {
    pet: { name: 'snuggles' }
  },
  chris: {
    pet: { name: 'spike' }
  },
}

var result = { };
forEach(values, { 
  '*': { 
    pet: { 
      name: null 
    } 
  } 
}, o => result[o] = true);

result
```
result:
```js
{
  tiger: true,
  snuggles: true,
  spike: true
}
```
## API
```ts
declare function forEach(
  tree: NestedDescriptor,
  paths: NestedDescriptor,
  callback: (leaf, path) => any,
  thisArg?
): void
```
### Interfaces
- `NestedDescriptor`: see [@kingjs/descriptor/nested][nested-descriptor]
### Parameters
- `tree`: The tree whose nodes will be frozen.
- `paths`: The paths of the tree to pass to the `callback`.
- `callback`: Used to update `paths` of `tree`:
  - `leaf`: The leaf value.
  - `path`: The path value.
- `thisArg`: The `this` argument to pass to `callback`.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/descriptor.nested.for-each
```
## License
MIT

![Analytics](https://analytics.kingjs.net/descriptor/nested/for-each)

  [nested-descriptor]: https://www.npmjs.com/package/@kingjs/descriptor/nested