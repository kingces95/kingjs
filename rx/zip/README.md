# @[kingjs][@kingjs]/[rx][ns0].[zip][ns1]
Create an `IObservable` that asynchronously emits values.
## Usage
```js
var assert = require('assert');
var create = require('@kingjs/rx.zip');
var { Subscribe } = require('@kingjs/i-observable');

async function run() {
  var count = 3;
  var result = [];

  await new Promise(resolve => {
    new create(function(next) {

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
zip()
```




## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.zip
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/get-iterator`](https://www.npmjs.com/package/@kingjs/get-iterator)|`latest`|
|[`@kingjs/i-observer`](https://www.npmjs.com/package/@kingjs/i-observer)|`latest`|
|[`@kingjs/rx.create`](https://www.npmjs.com/package/@kingjs/rx.create)|`latest`|
## Source
https://repository.kingjs.net/rx/zip
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/zip)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.zip
