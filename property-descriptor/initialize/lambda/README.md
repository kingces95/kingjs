# @[kingjs][@kingjs]/[property-descriptor][ns0].[initialize][ns1].[lambda][ns2]
Replaces a descriptors strings with functions.
## Usage
```js
var assert = require('assert');
var lambda = require('@kingjs/property-descriptor.initialize.lambda');

var target = { };

var foo = {
  value: '0'
}
foo = lambda.call(foo, 'Foo');
assert(foo.value.name = 'Foo');

var bar = {
  get: 'this.field', 
  set: 'this.field = value'
}
bar = lambda.call(bar, 'Bar');
assert(bar.get.name = 'Bar');
assert(bar.set.name = 'Bar');

Object.defineProperties(target, { foo, bar });
assert(target.foo() == 0);
target.bar = 1;
assert(target.field == 1);
assert(target.bar == 1);
```
## API
```ts
lambda(this, name)
```
### Parameters
- `this`: The descriptor whose strings will become lambda functions.
- `name`: The name of the lambda functions.
### Returns
The descriptor whose strings are replaced with lambda functions.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/property-descriptor.initialize.lambda
```
## License
MIT

![Analytics](https://analytics.kingjs.net/property-descriptor/initialize/lambda)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/property-descriptor
[ns1]: https://www.npmjs.com/package/@kingjs/property-descriptor.initialize
[ns2]: https://www.npmjs.com/package/@kingjs/property-descriptor.initialize.lambda
