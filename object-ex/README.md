# @[kingjs](https://www.npmjs.com/package/kingjs)/object-ex
## Usage
```js
var objectEx = require('@kingjs/object-ex');
```
---
Property descriptors are divided into classes named:
- `field`
- `function`
- `accessor`
- `property`

Each class name is prefixed with various combinations to form an export:
- `set` or `define`: Configurable or not configurable respectively.
- `hidden`: Not enumerable, otherwise enumerable
- `const`: Not writable, otherwise writable
- `lazy`: Inject stub that will cache result on `this` at runtime.
- `static`: Modifies `lazy`. Use if `target` and `this` are the same at runtime.

Each class of exports supports different overrides. For example the following are equivalent:
```js
defineFunction(target, 'foo', { value: function() { ... } })
defineFunction(target, { value: function foo() { ... } })
defineFunction(target, function foo() { ... })
```
Any properties specified in an override that takes a descriptor will override those properties implied by the prefix. For example, the following will produce an enumerable accessor:
```js
defineHiddenAccessor(target, 'bar', { enumerable: true, get: () => ... })
```
Strings that appear where functions are expected will be used to construct an appropriate Function. For example, the following are equivalent:
```js
// function lambda
defineFunction(target, 'foo', 'this.bar')
defineFunction(target, 'foo', function() { return this.bar; })

// get/set lambdas
defineFunction(target, 'foo', 'this.bar', 'this.bar = value')
defineAccessor(target, 'foo', 
  function() { return this.bar; })
  function(value) { this.bar = value; }
)

// function NOT expected so string treated as a value
defineField(target, 'foo', 'this.bar')
defineProperty(target, 'foo', { value: 'this.bar' })
```
---
## Field API
These overrides are supported for all prefixes, not just `define`:
```js
defineField(target, name, value)
```
|API|configurable|enumerable|writable|
|---|---|---|---|
|`setField`|x|x|x|
|`setHiddenField`|x||x|
|`setConstField`|x|x||
|`setHiddenConstField`|x||
|`defineField`||x|x|
|`defineHiddenField`|||x|
|`defineConstField`||x||
|`defineHiddenConstField`|||
## Function API
These overrides are supported for all prefixes, not just `define`:
```js
defineFunction(target, namedFunction)
defineFunction(target, name, function)
defineFunction(target, name, { value: function, ... })
```
|API|configurable|enumerable|writable|lazy|static|
|---|---|---|---|---|---|
|`defineFunction`|
|`defineLazyFunction`||||x|
|`defineLazyStaticFunction`||||x|x|
## Accessor API
These overrides are supported for all prefixes, not just `define`:
```js
defineAccessor(target, namedGetter[, namedSetter])
defineAccessor(target, name, getter[, setter])
defineAccessor(target, { namedGetter[, namedSetter], ... })
defineAccessor(target, name, { getter[, setter], ... })
```
|API|configurable|enumerable|lazy|static|
|---|---|---|---|---|
|`setAccessor`|x|x|
|`setHiddenAccessor`|x|
|`setLazyAccessor`|x|x|x|
|`setHiddenLazyAccessor`|x||x|
|`setLazyStaticAccessor`|x|x|x|x|
|`setHiddenLazyStaticAccessor`|x||x|x|
|`defineAccessor`||x|
|`defineHiddenAccessor`|
|`defineLazyAccessor`||x|x|
|`defineHiddenLazyAccessor`|||x|
|`defineLazyStaticAccessor`||x|x|x|
|`defineHiddenLazyStaticAccessor`|||x|x|
## Remarks
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/object-ex
```
## License
MIT

![Analytics](https://analytics.kingjs.net/object-ex)