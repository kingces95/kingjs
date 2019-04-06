# @[kingjs][@kingjs]/[rx][ns0].[select-many][ns1]
Returns an `IObservable` that blends this `IObservable` with those passed as arguments.
## Usage
```js
require('@kingjs/shim')
var assert = require('assert');
var SelectMany = require('@kingjs/rx.select-many');
var { Subscribe } = require('@kingjs/i-observable');
var of = require('@kingjs/rx.of');

result = [];

of({ x: of(0, 2) }, { x: of(1, 3) })
  [SelectMany](o => o.x)
  [Subscribe](o => result.push(o));

assert.deepEqual(result, [0, 2, 1, 3])
```

## API
```ts
selectMany(this, arguments)
```

### Parameters
- `this`: The `IObservable` whose emissions will be blended.
- `arguments`: A list of `IObservables` whose emissions will be blended.
### Returns
Returns a new `IObservable` that emits a blend of all emissions of this `IObservable` and all `IObservable`s passed as arguments.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.select-many
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-observable`](https://www.npmjs.com/package/@kingjs/i-observable)|`latest`|
|[`@kingjs/i-observer`](https://www.npmjs.com/package/@kingjs/i-observer)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/rx.create`](https://www.npmjs.com/package/@kingjs/rx.create)|`latest`|
## Source
https://repository.kingjs.net/rx/select-many
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/select-many)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.select-many
