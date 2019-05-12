# @[kingjs][@kingjs]/[buffer][ns0].[append][ns1]
Append buffers to a buffer.
## Usage
```js
var assert = require('assert');
var is = require('@kingjs/reflect.is');
var Append = require('@kingjs/buffer.append');

var a = Buffer.from('a')
assert(a[Append]().toString() == 'a')

var b = Buffer.from('b')
assert(a[Append](b).toString() == 'ab')
assert(a[Append](b, b).toString() == 'abb')


```

## API
```ts
append(this, any)
```

### Parameters
- `this`: The source buffer.
- `any`: The buffers to append.
### Returns
Returns a buffer.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/buffer.append
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/reflect.is`](https://www.npmjs.com/package/@kingjs/reflect.is)|`latest`|
## Source
https://repository.kingjs.net/buffer/append
## License
MIT

![Analytics](https://analytics.kingjs.net/buffer/append)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/buffer
[ns1]: https://www.npmjs.com/package/@kingjs/buffer.append
