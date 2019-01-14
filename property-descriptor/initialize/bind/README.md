# @[kingjs][@kingjs]/[property-descriptor][ns0].[initialize][ns1].[bind][ns2]
Binds functions in the descriptor to a target.
## Usage
```js
var assert = require('assert');
var bind = require('@kingjs/property-descriptor.initialize.bind');

var target = { id: 'target' };

var foo = {
  value: function() { return this; }
}
foo = bind.call(foo, target, 'foo');
assert(foo.value.name = 'foo (bound)');

var bar = {
  get: function() { return this.value; }, 
  set: function(value) { this.value = value; }
}
bar = bind.call(bar, target, 'bar');
assert(bar.get.name = 'bar (bound)');
assert(bar.set.name = 'bar (bound)');

var host = { id: 'host' };
Object.defineProperties(host, { foo, bar });

assert(host.foo() == target);
host.bar = 0;
assert(host.bar == target.value);

```
## API
```ts
bind(this, target, name)
```
### Parameters
- `this`: The descriptor whose functions will be bound.
- `target`: The target to bind to each function in the descriptor.
- `name`: The name to assign to the bound functions.
### Returns
Returns the descriptor with its functions bound to the target.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/property-descriptor.initialize.bind
```
## License
MIT

![Analytics](https://analytics.kingjs.net/{path})

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/property-descriptor
[ns1]: https://www.npmjs.com/package/@kingjs/property-descriptor.initialize
[ns2]: https://www.npmjs.com/package/@kingjs/property-descriptor.initialize.bind
