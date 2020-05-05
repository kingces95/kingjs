# @[kingjs][@kingjs]/[assert-theory][ns0]
Calls a theory with every combination of elements from an array set.
## Usage
```js
'use strict';

var testTheory = require('@kingjs/assert-theory');
var assert = require('assert');

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

assert(id == 3 * 3 * 2);

```

## API
```ts
assertTheory(theory(this, observation, id), observations, runId)
```

### Parameters
- `theory`: A function that tests a set of observations.
  - `this`: The `observations`.
  - `observation`: The observation generated from `data`.
  - `id`: The number identifying `observation`.
- `observations`: A descriptor whose every property contains  either an array, primitive, or object from which a sequence of  similar descriptors is generated where each property is replaced  with an array element, the primitive, or a property value respectively.
- `runId`: If present, runs only the observation with the given `id`.

### Remarks
If an `observation` fails then it can be easily debugged by supplying  `runId`. If `runId` is specified an exception is still thrown after the test  pass to ensure that the `runId` is removed.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/assert-theory
```

## Source
https://repository.kingjs.net/assert-theory
## License
MIT

![Analytics](https://analytics.kingjs.net/assert-theory)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/assert-theory
