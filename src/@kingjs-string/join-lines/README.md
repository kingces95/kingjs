# @[kingjs][@kingjs]/[string-ex][ns0].[join-lines][ns1]
Join lines in a string with a separator.
## Usage
```js
var assert = require('assert');
var os = require('os');
var JoinLines = require('@kingjs/string-ex.join-lines');

var EndOfLine = os.EOL;
var NewLine = '\n';
var CarriageReturn = '\r';

var lines = `foo${NewLine}bar${CarriageReturn}baz${EndOfLine}moo`;

var paragraph = lines[JoinLines]();
assert(paragraph == 'foo bar baz moo');

var fullName = lines[JoinLines]('.');
assert(fullName == 'foo.bar.baz.moo');

```

## API
```ts
joinLines(this[, separator])
```
### Parameters
- `this`: The string of newlines to join.
- `separator`: The separator to join the newlines with.
### Returns
Returns the string with newlines replaced with the separator.
### Remarks
Adjacent empty lines are replaced with a single separator.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/string-ex.join-lines
```
## Source
https://repository.kingjs.net/string-ex/join-lines
## License
MIT

![Analytics](https://analytics.kingjs.net/string-ex/join-lines)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/string-ex
[ns1]: https://www.npmjs.com/package/@kingjs/string-ex.join-lines
