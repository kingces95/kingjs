# @[kingjs][@kingjs]/[property-descriptor][ns0].[construct-accessor][ns1]
Construct an object `{ target, name, descriptor: { get, set } }` where `name`, `get`, and `set` are harvested from named functions, or  are passed separately as a string and functions, or as a string and an object.
## Usage
```js
var constructAccessor = require('@kingjs/property-descriptor.construct-accessor');
var assert = require('assert')

var target = { };
var get = function foo() { }
var set = function foo() { }
var bar = 'bar';

function assertConstruction(construction, expectedName) {
  var { target, name, descriptor } = construction;
  assert(target == target);
  assert(name == expectedName);
  assert(descriptor.get == get);
  assert(descriptor.set == set);
}

// 1. Named Functions
// constructAccessor(target, namedGetter, namedSetter)
var construction = constructAccessor(target, get, set);
assertConstruction(construction, get.name);

// 2. Name + Anonymous Functions
// constructAccessor(target, name, getter, setter)
var construction = constructAccessor(target, bar, get, set);
assertConstruction(construction, bar);

// 3. Descriptor Composed of Named Functions
// constructAccessor(target, { namedGetter, namedSetter })
var construction = constructAccessor(target, { get, set });
assertConstruction(construction, get.name);

// 4. Name + Descriptor Composed of Anonymous Functions
// constructAccessor(target, name, { getter, setter })
var construction = constructAccessor(target, bar, { get, set });
assertConstruction(construction, bar);

```

## API
```ts
constructAccessor(target, x[, y[, z]])
```
### Parameters
- `target`: The target on which the property will be declared.
- `x`: See the example for a list of overrides.
- `y`: See the example for a list of overrides.
- `z`: See the example for a list of overrides.
### Returns
An object with `{ target, name, descriptor: { value } }` properties where the descriptor properties are harvested from the arguments.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/property-descriptor.construct-accessor
```
## Source
https://repository.kingjs.net/property-descriptor/construct-accessor
## License
MIT

![Analytics](https://analytics.kingjs.net/property-descriptor/construct-accessor)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/property-descriptor
[ns1]: https://www.npmjs.com/package/@kingjs/property-descriptor.construct-accessor
