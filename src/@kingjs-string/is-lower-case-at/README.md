# @[kingjs][@kingjs]/[string-ex][ns0].[is-lower-case-at][ns1]
Test if a character at an index in a string is lower case.
## Usage
```js
var assert = require('assert');
var IsLowerCaseAt = require('@kingjs/string-ex.is-lower-case-at');

assert('Foo'[IsLowerCaseAt](0) == false);
assert('Foo'[IsLowerCaseAt](1) == true);
```

## API
```ts
isLowerCaseAt(this, index)
```
### Parameters
- `this`: The string.
- `index`: The zero based index at which to test casing.
### Returns
Returns true if the character at `index` is lower case.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/string-ex.is-lower-case-at
```
## Source
https://repository.kingjs.net/string-ex/is-lower-case-at
## License
MIT

![Analytics](https://analytics.kingjs.net/string-ex/is-lower-case-at)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/string-ex
[ns1]: https://www.npmjs.com/package/@kingjs/string-ex.is-lower-case-at
