# @[kingjs](https://www.npmjs.com/package/kingjs)/[linq](https://www.npmjs.com/package/@kingjs/linq).average
Returns the average value of a sequence of numbers projected from elements of a sequence.
## Usage
Compute the average of `[-2, 0, 2]` like this:
```js
var average = require('@kingjs/linq.average');
var sequence = require('@kingjs/enumerable.create');

average.call(sequence(-2, 0, 2));
```
result:
```js
0
```

## API
```ts
declare function average(
  this: Enumerable,
  selector?: function(x): number
): number
```
### Interfaces
- `Enumerable`: See [@kingjs/enumerable.define](https://www.npmjs.com/package/@kingjs/enumerable.define).

### Parameters
- `this`: The sequence of numbers to average.
- `selector`: A function to select a number from each element.

### Return Value
The average value of the sequence of numbers. Returns `NaN` if the sequence is empty.

## Remarks
Elements are summed using the `+` operator.

Average of an empty sequence is `NaN`.

## Install
With [npm](https://npmjs.org/) installed, run

```
$ npm install @kingjs/linq.average
```
## See Also
Like [Enumerable.Average](https://msdn.microsoft.com/en-us/library/bb358946(v=vs.110).aspx)

## License

MIT

![Analytics](https://analytics.kingjs.net/linq/average)