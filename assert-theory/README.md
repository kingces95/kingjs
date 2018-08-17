# @[kingjs](https://www.npmjs.com/package/kingjs)/assert-theory
Assert that a theory is true for a combination of observations.
## Usage
Assert that addition and multiplication are [commutative](https://en.wikipedia.org/wiki/Commutative_property) operations for a combination of 3 whole numbers and 3 fractions like this:
```js
var testTheory = require('@kingjs/assert-theory');
var assert = require('@kingjs/assert');

var id = 0;

testTheory(function(o, i) {
  assert(id++ == i);

  var naturalFirst = eval(o.natural + o.op + o.fraction);
  var fractionFirst = eval(o.fraction + o.op + o.natural);

  assert(naturalFirst == fractionFirst); 
}, {
  op: [ '+', '*' ],
  natural: [1, 2, 3],
  fraction: [.1, .2, .3],
});

assert(id == 3 * 3 * 2); // = 18
```
## API
```ts
function testTheory(theory: (observation, i) => void, data);
```
### Parameters
- `theory`: A function that tests a set of observations.
  - `observation`: The observation generated from `data`.
  - `i`: The number identifying `observation`. 
- `data`: A descriptor whose properties contain arrays from which a sequence of similar descriptors is generated where each property is replaced with a value from its associated array.
## Remarks
If an `observation` fails then it can be easily debugged by adding logic to return from `theory` if `i` does not equal the id of the failing `observation` and restarting the test. 
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/assert-theory
```
## Acknowledgments
Like nUnit [`TheoryAttribute`](https://github.com/nunit/docs/wiki/Theory-Attribute).
## License
MIT

![Analytics](https://analytics.kingjs.net/assert-theory)

