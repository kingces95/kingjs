# @[kingjs][@kingjs]/[rx][ns0].[create-async][ns1]
The description.
## Usage
```js
var assert = require('assert');
var createAsync = require('@kingjs/rx.create-async');
var { Subscribe } = require('@kingjs/i-observable');

async function run() {
  var count = 3;
  var result = [];

  await new Promise(resolve => {
    new createAsync(next => {

      if (!this.i)
        this.i = 0;

      // prove values are returned in different clock ticks
      process.nextTick(() => result.push(null));
      
      if (this.i == count)
        return false;

      next(this.i++);
      return true;
    })[Subscribe](o => result.push(o), resolve);
  })

  assert.deepEqual(result, [0, null, 1, null, 2, null])
}
run();
```

## API
```ts
createAsync(callback, interval)
```

### Parameters
- `callback`: 
- `interval`: 



## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.create-async
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-observer`](https://www.npmjs.com/package/@kingjs/i-observer)|`latest`|
|[`@kingjs/promise.sleep`](https://www.npmjs.com/package/@kingjs/promise.sleep)|`latest`|
|[`@kingjs/rx.create`](https://www.npmjs.com/package/@kingjs/rx.create)|`latest`|
## Source
https://repository.kingjs.net/rx/create-async
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/create-async)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.create-async
