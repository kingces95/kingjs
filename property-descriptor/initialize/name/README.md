# @[kingjs][@kingjs]/[property-descriptor][ns0].[initialize][ns1].[name][ns2]
Renames functions in the descriptor. Allows for optional parenthesized tag.
## Usage
```js
var assert = require('assert');
var name = require('@kingjs/property-descriptor.initialize.name');

var foo = {
  value: function() { }
}
foo = name.call(foo, 'Foo', 'thunk');
assert(foo.value.name == 'Foo (thunk)');

var bar = {
  get: function() { }, 
  set: function(value) { }
}
bar = name.call(bar, 'Bar', 'stub');
assert(bar.get.name == 'Bar (stub)');
assert(bar.set.name == 'Bar (stub)');

```

## API
```ts
name(this, name[, type])
```
### Parameters
- `this`: The descriptor whose functions will be renamed.
- `name`: The name to assign to each function.
- `type`: An optional tag to parenthesize and append to the name (e.g. a stub id).
### Returns
Returns the descriptor with its functions renamed.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/property-descriptor.initialize.name
```
## Source
https://repository.kingjs.net/property-descriptor.initialize.name
## License
MIT

![Analytics](https://analytics.kingjs.net/property-descriptor/initialize/name)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/property-descriptor
[ns1]: https://www.npmjs.com/package/@kingjs/property-descriptor.initialize
[ns2]: https://www.npmjs.com/package/@kingjs/property-descriptor.initialize.name
