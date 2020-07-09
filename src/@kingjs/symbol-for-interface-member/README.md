# @[kingjs][@kingjs]/[reflect][ns0].[create-symbol][ns1]
Creates a symbol with a debug string derived from the module name.
## Usage
```js
var assert = require('assert')
var createSymbol = require('@kingjs/reflect.create-symbol')

var Ex = createSymbol(module)
console.log(Ex)
// Ex debug string is `@kingjs/ex, 1.0.0`

var Foo = createSymbol(module, 'foo')
console.log(Foo)
// Foo debug string is `@kingjs/ex.foo, 1.0.0`
```

## API
```ts
createSymbol(module[, id])
```

### Parameters
- `module`: The module hosting the extension.
- `id`: The id of the symbol.
### Returns
Returns a symbol whose name is of the form module name,  optionally followed by dot plus `id`, followed by a comma and the module version.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/reflect.create-symbol
```

## Source
https://repository.kingjs.net/reflect/create-symbol
## License
MIT

![Analytics](https://analytics.kingjs.net/reflect/create-symbol)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/reflect
[ns1]: https://www.npmjs.com/package/@kingjs/reflect.create-symbol
