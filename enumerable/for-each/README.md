# @[kingjs](https://www.npmjs.com/package/kingjs)/[enumerable](https://www.npmjs.com/package/@kingjs/enumerable).for-each
Invokes a function for each element in a sequence.
## Usage
Log if a value has an even or odd index like this:
```js
var forEach = require('@kingjs/enumerable.for-each');
var sequence = require('@kingjs/enumerable.create')

var result = [];

forEach(function(x, i) {
  result.push(x + ' at ' + i)
}, sequence('a', 'b', 'c'));

result;
```
result:
```js
[ 
  'a at 0',
  'b at 1',
  'c at 2',
]
```
## API
```ts
function forEach(
  action: (x, i) => void, 
  sequence: Enumerable
);
```
### Interfaces
- `Enumerable`: See [@kingjs/enumerable.define](https://www.npmjs.com/package/@kingjs/enumerable.define).
### Parameters
- `action`: The action to call for each element in `sequence`.
  - `x`: Current element of `sequence`.
  - `i`: The index of element `x`.
- `sequence`: The elements to pass to `action`.
## Remarks
`action` will be invoked with the same `this` as was passed to `forEach`. 
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/enumerable.for-each
```
## License
MIT

![Analytics](https://analytics.kingjs.net/enumerable/for-each)