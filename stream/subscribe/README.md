# @[kingjs][@kingjs]/[stream][ns0].[subscribe][ns1]
Expose a stream as an `IObservable`.
## Usage
```js
var assert = require('assert');
var xxx = require('@kingjs/stream.subscribe');
```

## API
```ts
toObservable(this[, backPressure])
```

### Parameters
- `this`: The `stream` to be exposed as an `IObservable`.
- `backPressure`: An array into subscribers may push promises to cause the observable to emit empty buffers until those promises are fulfilled.

### Remarks
 - Originally designed for streaming zip decompression, the observer would
   - push a directory creation promise into `backPressure`
   - observe an empty buffer emission
   - push a file creation promise into `backPressure`
   - observe an empty buffer emission
   - not push another promise
   - and get a buffer with data it could write to the file.
 - If the file handle backs up, it would push a promise that would  be fulfilled with the `drain` event fired.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/stream.subscribe
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-observer`](https://www.npmjs.com/package/@kingjs/i-observer)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/rx.create`](https://www.npmjs.com/package/@kingjs/rx.create)|`latest`|
## Source
https://repository.kingjs.net/stream/subscribe
## License
MIT

![Analytics](https://analytics.kingjs.net/stream/subscribe)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/stream
[ns1]: https://www.npmjs.com/package/@kingjs/stream.subscribe
