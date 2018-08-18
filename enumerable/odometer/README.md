# @[kingjs](https://www.npmjs.com/package/kingjs)/[enumerable](https://www.npmjs.com/package/@kingjs/enumerable).odometer
Generates arrays of odometer digits.
## Usage
A typical car odometer has 7 wheels, each wheel has 10 digits, and a new value is generated as the car moves along. These values can be generated for 11 units of distance like this:
```js
var odometer = require('@kingjs/enumerable.odometer')

var enumerable = odometer([10, 10, 10, 10, 10, 10, 10]);
var enumerator = enumerable.getEnumerator();

var actual = [];
for (var distance = 0; distance < 11; distance++) {
  enumerator.moveNext();
  var current = enumerator.current;
  actual.push(current.reverse());
}

actual;
```
result:
```js
[
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 2],
  [0, 0, 0, 0, 0, 0, 3],
  [0, 0, 0, 0, 0, 0, 4],
  [0, 0, 0, 0, 0, 0, 5],
  [0, 0, 0, 0, 0, 0, 6],
  [0, 0, 0, 0, 0, 0, 7],
  [0, 0, 0, 0, 0, 0, 8],
  [0, 0, 0, 0, 0, 0, 9],
  [0, 0, 0, 0, 0, 1, 0],
];
```
## API
```ts
function odometer(
  bases?: number[]
): Enumerable
```
### Interfaces
- `Enumerable`: See [@kingjs/enumerable.define](https://www.npmjs.com/package/@kingjs/enumerable.define).
### Parameters
- `bases`: an array of normal numbers specifying the number of digits on each wheel of the odometer at each position. May also be passed as an argument list.
### Return Value
Returns a sequence of arrays composed of the digits produced by an odometer of the specified number of digits and bases. The generator terminates after every combination has been generated.
## Remarks
A typical odometer increments digits from right to left however `odometer` increments from left to right so digits increment starting at index 0.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/enumerable.odometer
```
## License
MIT

![Analytics](https://analytics.kingjs.net/enumerable/odometer)