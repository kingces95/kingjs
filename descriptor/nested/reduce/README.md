# @[kingjs](https://www.npmjs.com/package/kingjs)/[descriptor](https://www.npmjs.com/package/@kingjs/descriptor).[nested](https://www.npmjs.com/package/@kingjs/descriptor.nested).reduce
Accumulates the values of leafs at specific paths using a callback.
## Usage
Return an array of pet names like this:
```js
var reduce = require('@kingjs/descriptor.nested.reduce');

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

reduce(people, tree, (a, o) => {
  if (!a)
    a = [];
  a.push(o);
  return a;
});
```
result:
```js
[ 'tiger', 'snuggles', 'spike' ]
```
## API
```ts
declare function reduce(
  tree: NestedDescriptor,
  paths: NestedDescriptor,
  callback: (accumulator, value) => any
): any
```
### Interfaces
- `NestedDescriptor`: see [@kingjs/descriptor/nested][nested-descriptor]
### Parameters
- `tree`: A tree whose leaf values that correspond to a path in `paths` are accumulated.
- `paths`: Paths to search in `tree`. If the path is found, then it's value is accumulated. Any property named `'*'` found in `paths` is replicated with properties whose names correspond to properties of `tree` not already present as siblings of `'*'`.
- `callback`: A callback invoked on each value accumulated. Return the newly accumulated value.
  - `accumulator`: The accumulated value so far. Will be `null` by default.
  - `value`: The leaf being currently accumulated.
### Returns
Returns the accumulated value or `null` if no values were accumulated..
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/descriptor.nested.reduce
```
## License
MIT

![Analytics](https://analytics.kingjs.net/descriptor/nested/reduce)

  [nested-descriptor]: https://www.npmjs.com/package/@kingjs/descriptor/nested