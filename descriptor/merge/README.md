# @[kingjs](https://www.npmjs.com/package/kingjs)/[descriptor](https://www.npmjs.com/package/@kingjs/descriptor).merge
Merges descriptor property values into `this` from `delta` using a callback to resolve conflicts.
## Usage
Copy properties from `source` to `target` overwriting any existing values like this:
```js
var merge = require('@kingjs/descriptor.merge');

var target = { 
  a: 0,
  b: 1, 
};

var source = { 
  b: 2,
  c: 3
};

function resolve(right, left) { 
  return right; 
}

merge.call(target, source, resolve); 

target;
```
result:
```js
{
  a: 0,
  b: 2,
  c: 3
}
```
## API
```ts
declare function merge(
  this: Descriptor, 
  delta?: Descriptor, 
  resolve?: (left, right, name: string) => any,
  copyOnWrite?: boolean
): any
```
### Interfaces
- `Descriptor`: see [@kingjs/descriptor][descriptor]
### Parameters
- `this`: An object into which properties are merged.
- `delta`: An object whose properties are merged into `this`.
- `resolve`: Invoked when merging into an existing value. Returns the merged value. If not supplied, then the existing value is taken.
  - `left`: The existing value.
  - `right`: The new value.
  - `name`: The name of the conflicting property.
- `copyOnWrite`: If true, then a copy of `this` will be created on the first write and returned instead of `this`.
### Returns
Returns `this` after merging properties from `delta`. 
## Remarks 
If `this` is frozen or `copyOnWrite` specified then a copy of `this` will be created on the first write and returned instead of `this`.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/descriptor.merge
```
## License
MIT

![Analytics](https://analytics.kingjs.net/descriptor/merge)

  [descriptor]: https://www.npmjs.com/package/@kingjs/descriptor
