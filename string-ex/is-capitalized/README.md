# @[kingjs][@kingjs]/[string-ex][ns0].[is-capitalized][ns1]
Test if a string is capitalized.
## Usage
```js
var assert = require('assert');
var IsCapitalized = require('@kingjs/string-ex.is-capitalized');

assert('Foo'[IsCapitalized]() == true);
assert('foo'[IsCapitalized]() == false);
```

## API
```ts
isCapitalized(this)
```
### Parameters
- `this`: The string.
### Returns
Returns true if the first character is upper case.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/string-ex.is-capitalized
```
## Source
https://repository.kingjs.net/string-ex/is-capitalized
## License
MIT

![Analytics](https://analytics.kingjs.net/string-ex/is-capitalized)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/string-ex
[ns1]: https://www.npmjs.com/package/@kingjs/string-ex.is-capitalized
