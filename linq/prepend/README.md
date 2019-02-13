# @[kingjs](https://www.npmjs.com/package/kingjs)/[linq](https://www.npmjs.com/package/@kingjs/linq).prepend
Generates an sequence identical to another sequence but with a value added to the start.
## Usage
Prepend `0` to the sequence `1`, `2`, `3` like this:
```js
var prepend = require('@kingjs/linq.prepend');
require('kingjs');
var toArray = require('@kingjs/linq.to-array');

var numbers = [1, 2, 3];

var result = prepend.call(numbers, 0);

toArray.call(result);
```
result:
```js
[0, 1, 2, 3]
```
## API
```ts
declare function prepend(
  this: Enumerable,
  value
): Enumerable
```
### Interfaces
- `Enumerable`: See [@kingjs/enumerable.define](https://www.npmjs.com/package/@kingjs/enumerable.define).
### Parameters
- `this`: A sequence of values. 
- `value`: The value to prepend.
### Return Value
Returns a sequence with `value` prepended.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.prepend
```
## Acknowledgments
Like [Enumerable.Prepend](https://msdn.microsoft.com/en-us/library/mt823357(v=vs.110).aspx)
## License 
MIT

![Analytics](https://analytics.kingjs.net/linq/prepend)
