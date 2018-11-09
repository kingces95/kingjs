# @[kingjs](https://www.npmjs.com/package/kingjs)/[descriptor](https://www.npmjs.com/package/@kingjs/descriptor).[nested](https://www.npmjs.com/package/@kingjs/descriptor.nested).[array](https://www.npmjs.com/package/@kingjs/descriptor.nested.array).reduce
Accumulates the values of an array tree using a callback.
## Usage
Return values of an array tree:
```js
var reduce = require('@kingjs/descriptor.nested.array.reduce');

var result = reduce([
  'a', [
    'b', [
      'c'
    ], 'd'
  ], 'e'
], (a, o) => {
  a.push(o); 
  return a 
}, [ ]);
```
result:
```js
[ 'a', 'b', 'c', 'd', 'e' ]
```
## API
```ts
declare function reduce(
  tree: NestedArrays,
  callback: (accumulator, value) => any,
  initialValue?,
  thisArg?
): any
```
### Interfaces
- `NestedArray`: see [@kingjs/descriptor/nested/array][nested-array-descriptor]
### Parameters
- `tree`: An array tree whose leaf values are accumulated.
- `callback`: A callback invoked on each value accumulated. Return the newly accumulated value.
  - `accumulator`: The accumulated value so far. Will be `null` by default.
  - `value`: The leaf being currently accumulated.
- `initialValue`: Value to use as the first argument of the callback. If no initial value is supplied, the first value visited will be used.
- `thisArg`: The `this` argument to pass to `callback`.
### Returns
Returns the accumulated value or `null` if no values were accumulated.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/descriptor.nested.array.reduce
```
## License
MIT

![Analytics](https://analytics.kingjs.net/descriptor/nested/array/reduce)

[nested-array-descriptor]: https://www.npmjs.com/package/@kingjs/descriptor/nested/array  