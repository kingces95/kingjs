# @[kingjs](https://www.npmjs.com/package/kingjs)/[linq](https://www.npmjs.com/package/@kingjs/linq).select
Generates a sequence of elements composed of elements of another sequence subject to a transform.
## Usage
Lower the case of `'A'`, `'B'`, `'C'` like this:
```js
var select = require('@kingjs/linq.select');
var sequence = require('@kingjs/enumerable.create');
var toArray = require('@kingjs/linq.to-array');

function selectLowerCase(x) {
  return String.prototype.toLowerCase.call(x);
}

var result = select(sequence('A', 'B', 'C'), selectLowerCase);

toArray.call(result);
```
result:
```js
['a', 'b', 'c']
```

## API
```ts
function select(
  this: Enumerable, 
  selector: (x, i) => any
): Enumerable
```
### Interfaces
- `Enumerable`: See [@kingjs/enumerable.define](https://www.npmjs.com/package/@kingjs/enumerable.define).

### Parameters
- `this`: A sequence of element to transform.
- `selector`: A transform applied to each element.
  - `x`: The element to transform.
  - `i`: The index of the element being transformed.

### Return Value
A transformation of each element of the original sequence. 

## Install
With [npm](https://npmjs.org/) installed, run

```
$ npm install @kingjs/link.select
```

## Acknowledgments
Like [Enumerable.Select](https://msdn.microsoft.com/en-us/library/bb548891(v=vs.110).aspx)

## License

MIT

![Analytics](https://analytics.kingjs.net/linq/select)