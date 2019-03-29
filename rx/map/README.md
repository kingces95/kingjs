# @[kingjs][@kingjs]/[rx][ns0].[map][ns1]
Returns an `IObservable` that maps values emitted from the current `IObservable`.
## Usage
```js
var assert = require('assert');
var { Subscribe } = require('@kingjs/i-observable');
var from = require('@kingjs/rx.from');
var Map = require('@kingjs/rx.map');

async function run() {
  var result = [];

  await new Promise((resolve) => {
    from([0, 1, 2])[Map](o => o + 1)[Subscribe](
      o => result.push(o),
      resolve,
    );
  });

  assert.deepEqual(result, [1, 2, 3]);
}
run();
```

## API
```ts
map(this, callback)
```

### Parameters
- `this`: The `IObservable` whose emitted value are mapped.
- `callback`: The function that maps each emitted value.
### Returns
Returns a new `IObservable` that emits mapped values.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.map
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-observable`](https://www.npmjs.com/package/@kingjs/i-observable)|`latest`|
|[`@kingjs/i-observer`](https://www.npmjs.com/package/@kingjs/i-observer)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/rx.create`](https://www.npmjs.com/package/@kingjs/rx.create)|`latest`|
## Source
https://repository.kingjs.net/rx/map
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/map)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.map
