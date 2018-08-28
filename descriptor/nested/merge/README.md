# @[kingjs](https://www.npmjs.com/package/kingjs)/[descriptor](https://www.npmjs.com/package/@kingjs/descriptor).[nested](https://www.npmjs.com/package/@kingjs/nested).merge
Merges into a nested target descriptor each path in a nested delta descriptor that also exists in a nested resolve descriptor using functions found in the latter to resolve any merge conflicts.
## Usage
Derive "worker" from "adult" using nested descriptors that contain a string value at path `wrap`, a descriptor at path `defaults`, and functions at path `preconditions`. The functions should be composed if there is a conflict while the values should be inherited as defaults.
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

var copyOnWrite = true;

function takeLeft(left, right) {
  return left;
}

var resolve = {
  wrap: takeLeft,
  defaults: function(left, right) { 
    return merge.call(left, right, takeLeft)
  },
  preconditions: function(left, right) {
    return function(x) {
      return right(left(x));
    }
  }
}

nestedMerge(worker, adult, resolve, copyOnWrite);
```
results:
```js
{
  wrap: 'name',
  defaults: {
    name: 'John Doe',
    age: 40,
  },
  preconditions: function(x) {
    return isAdult(notRetired(x));
  }
}
``` 
Flip `a0` and `b0` property values from `0` to `1` like this:
```js
var merge = require('@kingjs/descriptor.nested.merge');

var target = {
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

var resolve = {
  a0: takeRight,
  a2: takeRight,
  a4: { b0: takeRight, b2: takeRight },
  a5: { b0: takeRight }
};

merge(target, delta, resolve);
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
  target: Descriptor,
  delta: Descriptor,
  resolve: Descriptor,
  copyOnWrite: boolean
): Descriptor
```
### Interfaces
- `Descriptor`: see [@kingjs/descriptor][descriptor]
### Parameters
- `target`: Nested descriptor into which properties are merged. Paths are created if necessary.
- `delta`: Nested descriptor from which properties are merged into target but only if the path also exists in `resolve`.
- `resolve`: Nested descriptor of functions to resolve conflicts should a `target` and `delta` path both exists and have different values.
- `copyOnWrite`: If `true`, then `target` descriptors will be cloned as needed so that `target` remains unmodified.
### Returns
Returns a nested descriptor of `target`'s paths merged with paths merged from `delta` that also exist in `resolve`.
## Remarks
A `target`'s path's value is: 
- overwritten if it is `undefined`
- preserved if the `delta` value is `undefined` or (the same value)
- otherwise the conflict is resolved using the corresponding `resolve` function

Frozen path segments in `target` are cloned as needed.

An exception is thrown if:
- `resolve` contains a value that is not `null`, `undefined`, or a function.
- A *directory* in `resolve` is found to be a *value* in either `target` or `delta`.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/descriptor.nested.merge
```
## License
MIT

![Analytics](https://analytics.kingjs.net/descriptor/nested/merge)


  [descriptor]: https://www.npmjs.com/package/@kingjs/descriptor
