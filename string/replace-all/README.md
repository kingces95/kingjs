# @[kingjs][@kingjs]/[string][ns0].[replace-all][ns1]
Returns a new string in which all occurrences of a  substring are replaced with another string.
## Usage
```js
var assert = require('assert');
var replaceAll = require('@kingjs/string.replace-all');

var target = "fooBarFooBar";
var result = replaceAll.call(target, 'Bar', 'Moo');
assert(result == 'fooMooFooMoo');

```

## API
```ts
replaceAll(this, oldValue, newValue)
```
### Parameters
- `this`: The string to search and replace.
- `oldValue`: The string to be replaced.
- `newValue`: The string to replace all occurrences of `oldValue`.
### Returns
A string that is equivalent to the current string except that all instances of `oldValue` are replaced with `newValue`.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/string.replace-all
```
## Source
https://repository.kingjs.net/string/replace-all
## License
MIT

![Analytics](https://analytics.kingjs.net/string/replace-all)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/string
[ns1]: https://www.npmjs.com/package/@kingjs/string.replace-all
