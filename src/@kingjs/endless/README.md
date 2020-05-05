# @[kingjs][@kingjs]/[endless][ns0]
Returns a function that returns `value`. If value  is iterable it's elements are returned after which undefined is returned.
## Usage
```js
var assert = require('assert');
var xxx = require('@kingjs/endless');
```

## API
```ts
endless(value)
```

### Parameters
- `value`: The value to return or an interable.
### Returns
Returns a function that returns `value` or, if `value` is iterable, than its elements and then undefined.
### Remarks
The following constants have interned functions: `1`, `0`, `true`, `false`, `null`, `undefined`.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/endless
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/reflect.is`](https://www.npmjs.com/package/@kingjs/reflect.is)|`latest`|
## Source
https://repository.kingjs.net/endless
## License
MIT

![Analytics](https://analytics.kingjs.net/endless)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/endless
