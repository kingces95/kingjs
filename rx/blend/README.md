# @[kingjs][@kingjs]/[rx][ns0].[blend][ns1]
Returns an `IObservable` that blends this `IObservable` with those passed as arguments.
## Usage
```js
require('@kingjs/shim')
var assert = require('assert');
var Blend = require('@kingjs/rx.blend');
var { Subscribe } = require('@kingjs/i-observable');
var clock = require('@kingjs/rx.clock');
var Map = require('@kingjs/rx.map');
var sleep = require('@kingjs/promise.sleep');

result = { };

process.nextTick(async () => {
  var a = clock(5)[Map](t => ({ t, id: 'a' }));
  var b = clock(10)[Map](t => ({ t, id: 'b' }));
  var c = clock(15)[Map](t => ({ t, id: 'c' }));

  var abc = a[Blend](b, c);
  abc[Subscribe](o => { values.push(o) });
  await sleep(100);
});

console.log(result);
```

## API
```ts
blend(this, arguments)
```

### Parameters
- `this`: The `IObservable` whose emissions will be blended.
- `arguments`: A list of `IObservables` whose emissions will be blended.
### Returns
Returns a new `IObservable` that emits a blend of all emissions of this `IObservable` and all `IObservable`s passed as arguments.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.blend
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-observable`](https://www.npmjs.com/package/@kingjs/i-observable)|`latest`|
|[`@kingjs/i-observer`](https://www.npmjs.com/package/@kingjs/i-observer)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/rx.create`](https://www.npmjs.com/package/@kingjs/rx.create)|`latest`|
## Source
https://repository.kingjs.net/rx/blend
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/blend)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.blend
