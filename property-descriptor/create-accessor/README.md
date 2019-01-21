# @[kingjs](https://www.npmjs.com/package/kingjs)/define.normalize-accessor
## Usage
```js
var normalizeAccessor = require('..');
var assert = require('assert')

var target = { };
var get = function foo() { }
var set = function foo() { }
var bar = 'bar';

var {target, name, descriptor} = normalizeAccessor(target, get, set);
assert(target == target);
assert(name == get.name);
assert(descriptor.get == get);
assert(descriptor.set == set);

var {target, name, descriptor} = normalizeAccessor(target, { get, set });
assert(target == target);
assert(name == get.name);
assert(descriptor.get == get);
assert(descriptor.set == set);

var {target, name, descriptor} = normalizeAccessor(target, bar, get, set);
assert(target == target);
assert(name = bar);
assert(descriptor.get == get);
assert(descriptor.set == set);

var {target, name, descriptor} = normalizeAccessor(target, bar, { get, set });
assert(target == target);
assert(name = bar);
assert(descriptor.get == get);
assert(descriptor.set == set);
```
## API
```ts
declare function normalizeAccessor(
): any
```
### Parameters
### Returns
## Remarks
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/define.normalize-accessor
```
## License
MIT

![Analytics](https://analytics.kingjs.net/define.normalize-accessor)