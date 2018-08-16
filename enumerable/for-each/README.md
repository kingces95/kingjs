# @kingjs/for-each
Invoke a function for each element in an enumerable.
## Usage
Logging if each number in a range is even or odd could be done like this:
```js
var forEach = require('@kingjs/for-each');
var sequence = require('@kingjs/sequence')

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
- `Enumerable`: See [@kingjs/sequence](https://www.npmjs.com/package/@kingjs/sequence).
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
$ npm install @kingjs/for-each
```
## License
MIT

![Analytics](https://analytics.kingjs.net/enumerable/for-each)