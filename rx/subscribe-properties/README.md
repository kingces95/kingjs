# @[kingjs][@kingjs]/[rx][ns0].[subscribe-properties][ns1]
Like `Object.defineProperties`, write intermediate  results of iterators observing an `IObservables` to a `target`.
## Usage
```js
var assert = require('assert');
var xxx = require('@kingjs/rx.subscribe-properties');
```

## API
```ts
subscribeProperties(this, observations, descriptor)
```

### Parameters
- `this`: The `IObservable` under observation.
- `observations`: The target object onto which observations are written.
- `descriptor`: A set of name/value pairs where each value is an iterator  which will be subscribed to the `IObservable` and whose yield results will  written as `name` on `observations`.



## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.subscribe-properties
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/rx.i-observable`](https://www.npmjs.com/package/@kingjs/rx.i-observable)|`latest`|
|[`@kingjs/rx.subscribe-iterator`](https://www.npmjs.com/package/@kingjs/rx.subscribe-iterator)|`latest`|
## Source
https://repository.kingjs.net/rx/subscribe-properties
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/subscribe-properties)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.subscribe-properties
