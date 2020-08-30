# @[kingjs][@kingjs]/[rx][ns0].[of][ns1]
Create an `IObservable` from `arguments`.
## Usage
```js
var assert = require('assert');
var { Subscribe } = require('@kingjs/i-observable');
var of = require('@kingjs/rx.of');

var result = [];
var observable = of(0, 1, 2);
observable[Subscribe](o => result.push(o));
assert.deepEqual(result, [0, 1, 2]);
```

## API
```ts
of()
```


### Remarks
All values are emitted synchronously. As such, this is primarily a toy or testing tool with limited practical use.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.of
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/rx.from`](https://www.npmjs.com/package/@kingjs/rx.from)|`latest`|
## Source
https://repository.kingjs.net/rx/of
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/of)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.of
