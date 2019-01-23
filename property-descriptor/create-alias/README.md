# @[kingjs][@kingjs]/[property-descriptor][ns0].[create-alias][ns1]
Packages the a target, a name, and a descriptor that  is an alias of another accessor or function.
## Usage
```js
var assert = require('assert');
var createAlias = require('@kingjs/property-descriptor.create-alias');

// alias a function; foo -> Foo
var { target, name, descriptor } = createAlias({ Foo: () => 0 }, 'foo', 'Foo', true);
assert(descriptor.value.name = 'foo -> Foo');
Object.defineProperty(target, name, descriptor);

// get Foo via foo
assert(target.foo() == 0);

// alias an accessor; bar -> Bar
var { target, name, descriptor } = createAlias({ Bar: 1 }, 'bar', 'Bar');
assert(descriptor.get.name = 'bar -> Bar');
assert(descriptor.set.name = 'bar -> Bar');
Object.defineProperty(target, name, descriptor);

// get Bar via bar
assert(target.bar == 1);

// set Bar via bar
target.bar = 2;
assert(target.Bar == 2);
```

## API
```ts
createAlias(target, alias, name[, isFunction])
```
### Parameters
- `target`: The target on which the property will be defined.
- `alias`: The alias.
- `name`: The name of the accessor or function being aliased.
- `isFunction`: True, if the alias target is a function.
### Returns
An object with properties `target`, `name`, and `descriptor`  which describes thunks to a property of the specified `name`.

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
