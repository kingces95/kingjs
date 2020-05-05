# @[kingjs][@kingjs]/[rx][ns0].[then][ns1]
Returns an `IObservable` that emits values from the source `IObservable` followed by the values of another `IObservable`.
## Usage
```js
require('@kingjs/shim')
var assert = require('assert');
var { Subscribe } = require('@kingjs/rx.i-observable');
var timer = require('@kingjs/rx.timer');
var of = require('@kingjs/rx.of');
var Then = require('@kingjs/rx.then');

async function run() {
  var result = [];

  // timer + Then = an asynchronous multicast operator
  var four = timer()
    [Then](of(0, 1))
    [Then](of(2, 3));
  
  await Promise.all([
    new Promise(resolve => 
      four[Subscribe](
        o => result.push(o),
        resolve
      )
    ),
    new Promise(resolve => 
      four[Subscribe](
        o => result.push(o),
        resolve
      )
    )
  ])
    
  assert.deepEqual(result, [0, 0, 1, 1, 2, 2, 3, 3])
}
run();
```

## API
```ts
then(this, next)
```

### Parameters
- `this`: The source `IObservable`.
- `next`: The `IObservable` to emit after the source  `IObservable` completes.
### Returns
Returns a new `IObservable` that emits the values of two `IObservable`s, one after the other.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.then
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/rx.create`](https://www.npmjs.com/package/@kingjs/rx.create)|`latest`|
|[`@kingjs/rx.i-observable`](https://www.npmjs.com/package/@kingjs/rx.i-observable)|`latest`|
|[`@kingjs/rx.i-observer`](https://www.npmjs.com/package/@kingjs/rx.i-observer)|`latest`|
## Source
https://repository.kingjs.net/rx/then
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/then)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.then
