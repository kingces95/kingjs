# @[kingjs][@kingjs]/[linq][ns0].[to-observable][ns1]
Returns a cold IObservable of an IEnumerable published at a specified `interval` until exhausted.
## Usage
```js
require('kingjs')
var assert = require('assert');
var ToObservable = require('@kingjs/linq.to-observable');
var { Subscribe } = require('@kingjs/i-observable');

async function run() {
  var interval = 50;
  var result = [];
  var observable = [0, 1, 2][ToObservable](interval);

  var start = Date.now();
  await new Promise((resolve, reject) => {
    observable[Subscribe](
      o => { 
        result.push(o);

        var end = Date.now();
        assert(end - start >= interval);
        start = end;
      },
      resolve,
      reject
    );
  });

  assert.deepEqual(result, [0, 1, 2]);
}
run();
```

## API
```ts
toObservable(this, foo)
```

### Parameters
- `this`: `this` The enumerable from which elements are pulled.
- `foo`: `interval` The period at which to pull elements from the enumerable and publish them to the observers.
### Returns
Returns a cold IObservable.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.to-observable
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-enumerable`](https://www.npmjs.com/package/@kingjs/i-enumerable)|`latest`|
|[`@kingjs/i-enumerator`](https://www.npmjs.com/package/@kingjs/i-enumerator)|`latest`|
|[`@kingjs/i-observer`](https://www.npmjs.com/package/@kingjs/i-observer)|`latest`|
|[`@kingjs/promise.sleep`](https://www.npmjs.com/package/@kingjs/promise.sleep)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/rx.create`](https://www.npmjs.com/package/@kingjs/rx.create)|`latest`|
## Source
https://repository.kingjs.net/linq/to-observable
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/to-observable)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.to-observable
