# @[kingjs][@kingjs]/[rx][ns0].[fail][ns1]
Create an `IObservable` that emits an error.
## Usage
```js
require('@kingjs/shim')
var assert = require('assert');
var from = require('@kingjs/rx.fail');
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
fail(value)
```

### Parameters
- `value`: The error to emit.
### Returns
Returns `IObservable` that emits an error.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.fail
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-observer`](https://www.npmjs.com/package/@kingjs/i-observer)|`latest`|
|[`@kingjs/rx.create`](https://www.npmjs.com/package/@kingjs/rx.create)|`latest`|
## Source
https://repository.kingjs.net/rx/fail
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/fail)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.fail
