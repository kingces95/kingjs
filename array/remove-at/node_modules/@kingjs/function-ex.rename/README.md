# @[kingjs][@kingjs]/[function-ex][ns0].[rename][ns1]
Renames a function.
## Usage
```js
var assert = require('assert');
var Rename = require('@kingjs/function-ex.rename');

function foo() { }
var fooDescriptor = Object.getOwnPropertyDescriptor(foo, 'name');
assert(fooDescriptor.value == 'foo');

var bar = foo[Rename]('bar');
var barDescriptor = Object.getOwnPropertyDescriptor(foo, 'name');
assert(barDescriptor.value == 'bar');
assert(barDescriptor.enumerable == fooDescriptor.enumerable);
assert(barDescriptor.configurable == fooDescriptor.configurable);
assert(barDescriptor.writable == fooDescriptor.writable);

```

## API
```ts
rename(this, string)
```
### Parameters
- `this`: The function to rename.
- `string`: The name to assign the function.
### Returns
Returns the function.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/function-ex.rename
```
## Source
https://repository.kingjs.net/function-ex/rename
## License
MIT

![Analytics](https://analytics.kingjs.net/function-ex/rename)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/function-ex
[ns1]: https://www.npmjs.com/package/@kingjs/function-ex.rename
