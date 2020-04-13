# @[kingjs][@kingjs]/[property-descriptor][ns0].[rename][ns1]
Renames functions found in a descriptor.
## Usage
```js
var assert = require('assert');
var rename = require('@kingjs/property-descriptor.rename');

var foo = {
  value: function foo() { }
}
foo = rename.call(foo, '${name} (thunk)');
assert(foo.value.name == 'foo (thunk)');

var bar = {
  get: function getBar() { }, 
  set: function setBar(value) { }
}
bar = rename.call(bar, '${name} (stub)');
assert(bar.get.name == 'getBar (stub)');
assert(bar.set.name == 'setBar (stub)');

```

## API
```ts
rename(this, template)
```
### Parameters
- `this`: The descriptor whose functions will be renamed.
- `template`: The name to assign to each function. A  placeholder for `name` will be expanded to the name of  the function being replaced.
### Returns
Returns the descriptor with its functions renamed.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/property-descriptor.rename
```
## Source
https://repository.kingjs.net/property-descriptor/rename
## License
MIT

![Analytics](https://analytics.kingjs.net/property-descriptor/rename)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/property-descriptor
[ns1]: https://www.npmjs.com/package/@kingjs/property-descriptor.rename
