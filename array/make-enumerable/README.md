# @[kingjs](https://www.npmjs.com/package/kingjs)/[array](https://www.npmjs.com/package/@kingjs/array).make-enumerable
Makes an array enumerable by adding a `getEnumerable` method.
## Usage
Make an array enumerable like this:
```js
makeEnumerable = require('@kingjs/array.make-enumerable');
var array = makeEnumerable.call([ 1, 2 ]);

// array is an Array...
array.push(3); 

// ...that can also be enumerated...
var enumerator = array.getEnumerator();

// ...at the cost of becoming frozen.
// sequence.push(4); 

var result = [];
while (enumerator.moveNext())
  result.push(enumerator.current);
result;
```
result:
```js
[ 1, 2, 3 ]
```
## API
```ts
declare function makeEnumerable(
  this: Array
): Enumerable
```
### Interfaces
- `Enumerable`: See [@kingjs/enumerable.define](https://www.npmjs.com/package/@kingjs/enumerable.define).
### Parameters
- `this`: The array to augment with function `getEnumerator`.
### Returns
Returns `this` after adding a `getEnumerable` function. 
## Remarks
The array is frozen by the first call to `getEnumerator`.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/array.make-enumerable
```
## License
MIT

![Analytics](https://analytics.kingjs.net/array/make-enumerable)