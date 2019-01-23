# @[kingjs][@kingjs]/[property-descriptor][ns0].[construct-property][ns1]
Construct an object `{ target, name, descriptor: { value } }` where name and value are harvested from a named function or are passed separately where if value is an object it's copied else it's is wrapped.
## Usage
```js
var assert = require('assert')
var constructProperty = require('@kingjs/property-descriptor.construct-property');

function Type() { };
var prototype = Type.prototype;

// 1. Named Function
// constructProperty(target, namedFunction)
var myFunction = function myFunction() { };
var { target, name, descriptor } = constructProperty(
  prototype, myFunction
);
assert(target == prototype);
assert(name == 'myFunction');
assert(descriptor.value == myFunction);

// 2. Name + Non-Object Value
// constructProperty(target, name, [
//  undef|null|symbol|number|boolean|string|function
// ])
var { target, name, descriptor } = constructProperty(
  prototype, 'nonObject', true
);
assert(target == prototype);
assert(name == 'nonObject');
assert(descriptor.value === true);

// 3. Name + Object Value
// constructProperty(target, name, descriptor)
var { target, name, descriptor } = constructProperty(
  prototype, 'soTrue', { get: true }
);
assert(target == prototype);
assert(name == 'soTrue');
assert(descriptor.get === true);
```

## API
```ts
createProperty(target, x[, y])
```
### Parameters
- `target`: The target on which the property will be declared.
- `x`: See the example for a list of overrides.
- `y`: See the example for a list of overrides.
### Returns
An object with `{ target, name, descriptor: { value } }` properties where the descriptor properties are harvested from the arguments.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/property-descriptor.construct-property
```
## Source
https://repository.kingjs.net/property-descriptor/construct-property
## License
MIT

![Analytics](https://analytics.kingjs.net/property-descriptor/construct-property)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/property-descriptor
[ns1]: https://www.npmjs.com/package/@kingjs/property-descriptor.construct-property
