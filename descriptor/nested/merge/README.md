# @[kingjs](https://www.npmjs.com/package/kingjs)/[descriptor](https://www.npmjs.com/package/@kingjs/descriptor)/[nested](https://www.npmjs.com/package/@kingjs/nested).copy
Merges each path in source that also exists in resolve into this descriptor using functions found in resolve to resolve conflicting values.
## Usage
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

var source = { 
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

merge(target, source, resolve);
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
declare function augment(
  target: Descriptor,
  source: Descriptor,
  action: Descriptor
): Descriptor
```
### Interfaces
- `Descriptor`: see [@kingjs/descriptor][descriptor]
### Parameters
- `target`: Descriptor tree to which properties from corresponding `source` paths are copied if a corresponding `action` path exists. Paths are cloned and created as needed.
- `source`: Descriptor tree from which properties are copied to corresponding `target` paths if a corresponding `action` path exists.
- `action`: Descriptor tree of functions to combine corresponding property values of `target` and `source` before being copied to a clone of `target`.
### Returns
Returns a clone of `target` tree with values copied from `source` tree if those values share paths on `action`.
## Remarks
Imagine `target`, `source`, and `action` as directories of values where a directory is a `descriptor`. 

Each value in `source` is copied to its corresponding directory in `target` but only if there is also a corresponding value in `action`. 

Intermediate directories are created or cloned as needed.

A value is overwritten if it's `undefined` or preserved if the `source` value is `undefined`. When neither are `undefined` then, if there is a function at the corresponding `action` directory, that function is used to create the updated value given the values from `this` and `source`. If no function is found at `action` then the value is overwritten with the `source` value.

Exceptions are thrown if the following invariants are violated:
- `action` contains a value that is not `null`, `undefined`, or a function.
- A directory in `action` is found to be a value in either `this` or `source`.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/immutable.copy
```
## License
MIT

![Analytics](https://analytics.kingjs.net/immutable/copy)


  [descriptor]: https://www.npmjs.com/package/@kingjs/descriptor
