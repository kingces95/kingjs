# @[kingjs][@kingjs]/[rx][ns0].[distinct-until-changed][ns1]
Returns an `IObservable` whose each value is distinct from the previously emitted value.
## Usage
```js
var assert = require('assert');
var Subject = require('@kingjs/rx.subject');
var { Subscribe } = require('@kingjs/i-observable');
var { Next } = require('@kingjs/i-observer');
var Select = require('@kingjs/rx.select');
var Refine = require('@kingjs/rx.distinct-until-changed');
var clock = require('@kingjs/rx.clock');
var sleep = require('@kingjs/promise.sleep');

// the state to refine
var invert = false;

// subject observes refinements and emits clock ticks
var subject = new Subject();
var invertableClock = subject[Refine]((x, o) => {
  if (!x) {
    // activate clock with ticks refined by invert
    return clock()[Select](o => invert ? -o : o);
  }
  invert = o;
})

// subscribe to invertable clock
var resolved;
var dispose = invertableClock[Subscribe](o => resolved(o))

process.nextTick(async () => {

  // start clock and assert ticks are NOT inverted
  var promise = new Promise(o => resolved = o);
  subject[Next](false);
  var value = await promise;
  assert(value > 0);

  // refine clock and assert ticks ARE inverted
  var promise = new Promise(o => resolved = o);
  subject[Next](true);
  var value = await promise;
  assert(value < 0);

  dispose();
})

```

## API
```ts
distinctUntilChanged([keySelector[, equal]])
```

### Parameters
- `keySelector`: A callback to select the key used to  determine equality between two emitted values.
- `equal`: An call back which determines if two keys are equal.
### Returns
Returns an `IObservable` whose each value is distinct from the previously emitted value.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.distinct-until-changed
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/rx.create`](https://www.npmjs.com/package/@kingjs/rx.create)|`latest`|
|[`@kingjs/rx.i-observable`](https://www.npmjs.com/package/@kingjs/rx.i-observable)|`latest`|
|[`@kingjs/rx.i-observer`](https://www.npmjs.com/package/@kingjs/rx.i-observer)|`latest`|
|[`deep-equals`](https://www.npmjs.com/package/deep-equals)|`latest`|
## Source
https://repository.kingjs.net/rx/distinct-until-changed
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/distinct-until-changed)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.distinct-until-changed
