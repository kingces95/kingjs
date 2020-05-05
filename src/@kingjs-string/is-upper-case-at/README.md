# @[kingjs][@kingjs]/[string-ex][ns0].[is-upper-case-at][ns1]
Test if a character at an index in a string is upper case.
## Usage
```js
var assert = require('assert');
var IsUpperCaseAt = require('@kingjs/string-ex.is-upper-case-at');

assert('Foo'[IsUpperCaseAt](0) == true);
assert('Foo'[IsUpperCaseAt](1) == false);
```

## API
```ts
isUpperCaseAt(this, index)
```
### Parameters
- `this`: The string.
- `index`: The zero based index at which to test casing.
### Returns
Returns true if the character at `index` is upper case.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/string-ex.is-upper-case-at
```
## Source
https://repository.kingjs.net/string-ex/is-upper-case-at
## License
MIT

![Analytics](https://analytics.kingjs.net/string-ex/is-upper-case-at)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/string-ex
[ns1]: https://www.npmjs.com/package/@kingjs/string-ex.is-upper-case-at
