# @[kingjs][@kingjs]/[property-descriptor][ns0].[create-property][ns1]
Returns an object with a target, a name, and a descriptor  which is created by harvesting argument overloads.
## Usage
```js
var assert = require('assert')
var createProperty = require('@kingjs/property-descriptor.create-property');

function Type() { };
var prototype = Type.prototype;

// createProperty(target, namedFunction)
var myFunction = function myFunction() { };
var { target, name, descriptor } = createProperty(
  prototype, myFunction
);
assert(target == prototype);
assert(name == 'myFunction');
assert(descriptor.value == myFunction);

// createProperty(target, name, [
//  undef|null|symbol|number|boolean|string|function
// ])
var { target, name, descriptor } = createProperty(
  prototype, 'nonObject', true
);
assert(target == prototype);
assert(name == 'nonObject');
assert(descriptor.value === true);

// createProperty(target, name, descriptor)
var { target, name, descriptor } = createProperty(
  prototype, 'soTrue', { get: true }
);
assert(target == prototype);
assert(name == 'soTrue');
assert(descriptor.get === true);
```

## API
```ts
createProperty(target, x, y)
```
### Parameters
- `target`: The target on which the property will be declared.
- `x`: See the example for a list of overrides.
- `y`: See the example for a list of overrides.
### Returns
An object with `target`, `name`, and `descriptor` properties where the descriptor properties are harvested from the arguments.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/property-descriptor.create-property
```
## Source
https://repository.kingjs.net/property-descriptor/create-property
## License
MIT

![Analytics](https://analytics.kingjs.net/property-descriptor/create-property)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/property-descriptor
[ns1]: https://www.npmjs.com/package/@kingjs/property-descriptor.create-property
