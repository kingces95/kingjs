# @[kingjs][@kingjs]/[rx][ns0].[from][ns1]
Create an `IObservable` from a generator or  implementor of the iterator protocol.
## Usage
```js
require('@kingjs/shim')
var assert = require('assert');
var from = require('@kingjs/rx.from');
var { Subscribe } = require('@kingjs/i-observable');

function example(value) {
  var next;
  var complete;
  
  new from(value)[Subscribe](
    o => next = o, 
    () => complete = true
  );
  
  assert(next == 1);
  assert(complete);
}
example([1]);
example(function *() { yield 1; });

```

## API
```ts
from(value)
```

### Parameters
- `value`: `foo` comment.
### Returns
Returns `IObservable` that emits elements in value.
### Remarks
As all values are emitted synchronously, this is primarily a toy or testing tool with limited practical use otherwise.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.from
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-enumerable`](https://www.npmjs.com/package/@kingjs/i-enumerable)|`latest`|
|[`@kingjs/i-enumerator`](https://www.npmjs.com/package/@kingjs/i-enumerator)|`latest`|
|[`@kingjs/i-observer`](https://www.npmjs.com/package/@kingjs/i-observer)|`latest`|
|[`@kingjs/rx.create`](https://www.npmjs.com/package/@kingjs/rx.create)|`latest`|
## Source
https://repository.kingjs.net/rx/from
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/from)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.from
