# @[kingjs][@kingjs]/[rx][ns0].[subscribe-iterator][ns1]
Pump data into iterator and publish results to observations[name]
## Usage
```js
var assert = require('assert');
var xxx = require('@kingjs/rx.subscribe-iterator');
```

## API
```ts
subscribeIterator(this[, observations[, name]])
```

### Parameters
- `this`: An `IObservable` to which the iterator will be subscribed.
- `observations`: An object to which result of each iteration is written.
- `name`: The name of the observation to store the result of each iteration.

### Remarks
 - The iterator is started when the first value is observed.
 - The iterator accepts emitted values from yield (see iterable.next(value))  and can yield intermediate results to be saved in `name` on `observations`.
 - A `null` value is emitted to indicate the end of emissions. As such, this abstraction is only suitable if `null` is not a nominal emitted value.
 - Originally designed for streaming zip decompression, the chunks of the downloaded stream would be observed in order to save, inflate, and hash.  Those operation were implemented as an iterators that would accept a buffer of  data and return bytes downloaded and inflated (so progress could be reported) and the ultimate hash value.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.subscribe-iterator
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/rx.i-observable`](https://www.npmjs.com/package/@kingjs/rx.i-observable)|`latest`|
|[`@kingjs/rx.i-observer`](https://www.npmjs.com/package/@kingjs/rx.i-observer)|`latest`|
## Source
https://repository.kingjs.net/rx/subscribe-iterator
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/subscribe-iterator)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.subscribe-iterator
