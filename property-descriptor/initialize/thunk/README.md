# @[kingjs][@kingjs]/[property-descriptor][ns0].[initialize][ns1].[thunk][ns2]
Replaces a descriptors functions with thunks to a specified name.
## Usage
```js
var assert = require('assert');
var thunk = require('@kingjs/property-descriptor.initialize.thunk');

var target = { 
  Foo: () => 0,
  Bar: 1,
};

var foo = {
  value: null
}
foo = thunk.call(foo, 'Foo');
assert(foo.value.name = 'Foo (thunk)');

var bar = {
  get: null, 
  set: null
}
bar = thunk.call(bar, 'Bar');
assert(bar.get.name = 'Bar (thunk)');
assert(bar.set.name = 'Bar (thunk)');

Object.defineProperties(target, { foo, bar });
assert(target.foo() == 0);
assert(target.bar == 1);
target.bar = 2;
assert(target.Bar == 2);
```
## API
```ts
thunk(this, name)
```
### Parameters
- `this`: The descriptor whose functions will thunk to name.
- `name`: The name on thunk to.
### Returns
Returns the descriptor with functions that thunk to name.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/property-descriptor.initialize.thunk
```
## License
MIT

![Analytics](https://analytics.kingjs.net/property-descriptor/initialize/thunk)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/property-descriptor
[ns1]: https://www.npmjs.com/package/@kingjs/property-descriptor.initialize
[ns2]: https://www.npmjs.com/package/@kingjs/property-descriptor.initialize.thunk
