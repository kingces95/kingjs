# @[kingjs][@kingjs]/[reflect][ns0].[built-in-symbols][ns1]
A mapping from symbol to name for  each `Symbol` property whose value is a symbol.
## Usage
```js
var assert = require('assert')
var builtInSymbols = require('@kingjs/reflect.built-in-symbols');

// all builtInSymbols are in Symbol
for (var symbol of Object.getOwnPropertySymbols(builtInSymbols)) {
  var name = builtInSymbols[symbol];
  assert(Symbol[name] === symbol);
}

// all Symbols are in builtInSymbols
for (var name of Object.getOwnPropertyNames(Symbol)) {
  var symbol = Symbol[name];
  if (typeof symbol != 'symbol')
    continue;
  assert(builtInSymbols[symbol] == name);
}
```






## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/reflect.built-in-symbols
```

## Source
https://repository.kingjs.net/reflect/built-in-symbols
## License
MIT

![Analytics](https://analytics.kingjs.net/reflect/built-in-symbols)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/reflect
[ns1]: https://www.npmjs.com/package/@kingjs/reflect.built-in-symbols
