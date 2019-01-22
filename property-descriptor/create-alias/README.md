# @[kingjs][@kingjs]/[property-descriptor][ns0].[create-alias][ns1]
Create a descriptor that is an alias of an accessor or function.
## Usage
```js
var assert = require('assert');
var createAlias = require('@kingjs/property-descriptor.create-alias');

// alias a function; foo -> Foo
var fooDescriptor = createAlias('Foo', true);
assert(fooDescriptor.value.name = 'Foo (alias)');
var target = Object.defineProperty({ Foo: () => 0 }, 'foo', fooDescriptor);
assert(target.foo() == 0);

// alias an accessor; bar -> Bar
var barDescriptor = createAlias('Bar');
assert(barDescriptor.get.name = 'Bar (alias)');
assert(barDescriptor.set.name = 'Bar (alias)');
var target = Object.defineProperty({ Bar: 1 }, 'bar', barDescriptor);
assert(target.bar == 1);
target.bar = 2;
assert(target.Bar == 2);
```

## API
```ts
alias(name[, isFunction])
```
### Parameters
- `name`: The name of the accessor or function being aliased.
- `isFunction`: True, if the alias target is a function.
### Returns
A descriptor which will access or invoke a member of the specified name.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/property-descriptor.create-alias
```
## Source
https://repository.kingjs.net/property-descriptor/create-alias
## License
MIT

![Analytics](https://analytics.kingjs.net/property-descriptor/create-alias)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/property-descriptor
[ns1]: https://www.npmjs.com/package/@kingjs/property-descriptor.create-alias
