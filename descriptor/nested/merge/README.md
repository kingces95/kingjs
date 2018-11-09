# @[kingjs](https://www.npmjs.com/package/kingjs)/[descriptor](https://www.npmjs.com/package/@kingjs/descriptor).[nested](https://www.npmjs.com/package/@kingjs/descriptor.nested).merge
Merges values at paths found in one tree into another tree. 
## Usage
Derive "worker" from "adult" using custom operations to merge conflicting fields like this:
```js
var nestedMerge = require('@kingjs/descriptor.nested.merge');
var merge = require('@kingjs/descriptor.merge');
var assert = require('@kingjs/assert');

var adult = {
  wrap: 'name',
  defaults: {
    name: 'John Doe',
    age: 18
  },
  preconditions: {
    age: function isAdult(x) {
      assert(x >= 18);
      return x;
    }
  }
}

var worker = {
  defaults: {
    age: 40
  },
  preconditions: {
    age: function notRetired(x) {
      assert(x < 62);
      return x;
    }
  }
}

function takeLeft(left, right) {
  return left;
}

function compose(left, right) {
  return function(x) {
    return right(left(x));
  }
}

var paths = {
  wrap: takeLeft,
  defaults: function(left, right) { 
    return merge.call(left, right, takeLeft)
  },
  preconditions: function(left, right) {
    return merge.call(left, right, compose)
  }
}

var copyOnWrite = true;
var thisArg = null;
nestedMerge(worker, adult, paths, thisArg, copyOnWrite);
```
results:
```js
{
  wrap: 'name',
  defaults: {
    name: 'John Doe',
    age: 40,
  },
  preconditions: {
    age: function(x) {
      return isAdult(notRetired(x));
    } 
  }
}
``` 
Flip `a0` and `b0` property values from `0` to `1` like this:
```js
var merge = require('@kingjs/descriptor.nested.merge');

var tree = {
  a0: 0,
  a1: 0,
  a2: 0,
  a3: { b0: 0 },
  a4: { b0: 0, b1: 0, b2: 0 },
  a5: { b0: 0 }
};

var delta = { 
  a0: 1,
  a1: 1,
  a3: { b0: 1 },
  a4: { b0: 1, b1: 1 }
};

function takeRight(x, y) { 
  return y;
}

var paths = {
  a0: takeRight,
  a2: takeRight,
  a4: { b0: takeRight, b2: takeRight },
  a5: { b0: takeRight }
};

merge(tree, delta, paths);
```
result:
```js
{
  a0: 1,
  a1: 0,
  a2: 0,
  a3: { b0: 0 },
  a4: { b0: 1, b1: 0, b2: 0 },
  a5: { b0: 0 }
}
```
## API
```ts
declare function merge(
  tree: Descriptor,
  delta: Descriptor,
  paths: Descriptor,
  thisArg?
): Descriptor
```
### Interfaces
- `Descriptor`: see [@kingjs/descriptor][descriptor]
### Parameters
- `tree`: Tree into which delta is merged. Nodes are created if necessary.
- `delta`: Tree to merge into `tree`. 
- `paths`: Paths of `delta` to merge into `tree`. Functions found in `paths` will be used used to resolve conflicting tree values.
- `thisArg`: The `this` argument to pass to `callback`'s found in `paths`.
### Returns
Returns a nested descriptor of `tree`'s paths merged with paths merged from `delta` that also exist in `paths`.
## Remarks
A `tree`'s path's value is: 
- overwritten if it is `undefined`
- preserved if the `delta` value is `undefined` or (the same value)
- otherwise the conflict is resolved using the corresponding `paths` function

Frozen path segments in `tree` are cloned as needed.

An exception is thrown if there exists a path in `paths` without a resolution function and a conflict is found between values at that path in `tree` and `delta`.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/descriptor.nested.merge
```
## License
MIT

![Analytics](https://analytics.kingjs.net/descriptor/nested/merge)


  [descriptor]: https://www.npmjs.com/package/@kingjs/descriptor
