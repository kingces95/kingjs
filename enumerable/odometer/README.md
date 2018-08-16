# @[kingjs](https://www.npmjs.com/package/kingjs)/odometer
Generates arrays of odometer digits.
## Usage
A typical car odometer has 7 wheels, each wheel has 10 digits, and a new value is generated as the car moves along. These values can be generated like this:
```js
var Odometer = require('@kingjs/odometer')

var odometer = new Odometer([10, 10, 10, 10, 10, 10, 10]);

var enumerator = odometer.getEnumerator();

var actual = [];
for (var distance = 0; distance < 11; distance++) { // 11 is arbitrary
  generator.moveNext();
  var current = generator.current;
  actual.push(current.reverse());
}

actual;
```

outputs:

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
function odometer(bases?: number[]): {
  getEnumerator(): {
    moveNext(): boolean,
    current: number[]
  }
}
```
### Parameters
- `bases`: an array of normal numbers specifying the number of "digits" on each wheel of the odometer at each position. May also be passed as an argument list.
### Return Value
A sequence of arrays composed of the digits produced by an odometer of the specified number of digits and bases. The generator terminates after every combination has been generated.
## Remarks
A typical odometer increments digits from right to left. This odometer increments from left to right (which is why the example calls `Array.reverse()`). This is done so digits increment starting at index 0.

Originally developed to support [@kingjs/from-each](https://www.npmjs.com/package/@kingjs/from-each) which is in turn required by [@kingjs/assert-theory](https://www.npmjs.com/package/@kingjs/assert-theory).
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/odometer
```
## Acknowledgments
`fromEach` was inspired by nUnit `ValuesAttribute` and `TheoryAttribute` which use an odometer to generate combinations of test values from a set of arrays.

## See Also
- [`nunit.org`](http://nunit.org/)
- [`typescriptlang.org`](https://www.typescriptlang.org/)

## License

MIT

![Analytics](https://analytics.kingjs.net/enumerable/odometer)

