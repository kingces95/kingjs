# @[kingjs][@kingjs]/[define-extension][ns0]
Defines a property on a target with a symbol name  derived from `package` and `version`.
## Usage
```js
var assert = require('assert');
var defineExtension = require('@kingjs/define-extension');

var Rename = defineExtension(
  Function.prototype,
  '@kingjs/function-ex.rename',
  '1.0.0',
  function(name) {
    Object.defineProperty(
      this, 'name', { value: name }
    )
  }
)
assert(Rename.toString() == 'Symbol(@kingjs/function-ex.rename, 1.0.0)');

function foo() { }
foo[Rename]('bar');
assert(foo.name == 'bar');

```

## API
```ts
defineExtension(target, package, version, descriptor)
```

### Parameters
- `target`: The target on which to declare the property.
- `package`: The name of the package containing the extension.
- `version`: The version of the package containing the extension.
- `descriptor`: The descriptor describing the property.
### Returns
The symbol name of the property.
### Remarks
If `descriptor` is a function, then it will be wrapped in an  object with name `value`.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/define-extension
```

## Source
https://repository.kingjs.net/define-extension
## License
MIT

![Analytics](https://analytics.kingjs.net/define-extension)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/define-extension
