# @[kingjs][@kingjs]/[string][ns0].[expand][ns1]
Given a string with the format of a template literal,  expand its placeholders with the values corresponding to a descriptor's keys.
## Usage
```js
var assert = require('assert');
var expand = require('@kingjs/string.expand');

var foo = 'bar';
var result = expand.call('Key "foo" is "${foo}"', { foo });
assert('Key "foo" is "bar"' == result);
```

## API
```ts
expand(this[, descriptor])
```
### Parameters
- `this`: A string with the format of a template literal.
- `descriptor`: The values to substitute for the  placeholders in `this`.
### Returns
A string whose placeholder have been replaced with the  values of the corresponding descriptor keys.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/string.expand
```
## Source
https://repository.kingjs.net/string/expand
## License
MIT

![Analytics](https://analytics.kingjs.net/string/expand)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/string
[ns1]: https://www.npmjs.com/package/@kingjs/string.expand
