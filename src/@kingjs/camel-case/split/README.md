# @[kingjs][@kingjs]/[camel-case][ns0].[split][ns1]
Splits a string on its capital letters.
## Usage
```js
var assert = require('assert');
var split = require('@kingjs/camel-case.split');

var apart = split('fooBar');
assert(apart.length == 2);
assert(apart[0] = 'foo');
assert(apart[1] = 'bar');

var apart = split('FooBar');
assert(apart.length == 2);
assert(apart[0] = 'foo');
assert(apart[1] = 'bar');

var apart = split('FBar');
assert(apart.length == 2);
assert(apart[0] = 'f');
assert(apart[1] = 'bar');

var apart = split('');
assert(apart.length == 0);

```

## API
```ts
split(name)
```

### Parameters
- `name`: A camel case name to split.
### Returns
Array of names, all lower case, composing the camel case name.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/camel-case.split
```

## Source
https://repository.kingjs.net/camel-case/split
## License
MIT

![Analytics](https://analytics.kingjs.net/camel-case/split)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/camel-case
[ns1]: https://www.npmjs.com/package/@kingjs/camel-case.split
