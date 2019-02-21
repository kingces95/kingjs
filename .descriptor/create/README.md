# @[kingjs][@kingjs]/[descriptor][ns0].[create][ns1]
Creates a descriptor.
## Usage
```js
var create = require('@kingjs/descriptor.create');
var assert = require('assert');

var people = {
  alice: { name: 'Alice', age: 21 },
  bob: 'Bob'
}

for (var name in people)
  people[name] = create(people[name], { wrap: 'name' });

assert(Object.isFrozen(people.alice));
assert(Object.isFrozen(people.bob));

assert(people.alice.name == 'Alice');
assert(people.bob.name == 'Bob');
```

## API
```ts
create(descriptor, action, thisArg)
```

### Parameters
- `descriptor`: The value to create into a descriptor.
- `action`: The name of the property to hold `value`  or a function that accepts `value` and returns a descriptor.
- `thisArg`: 
### Returns
Returns `value` if already a descriptor, else a  normalized descriptor for value.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/descriptor.create
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/descriptor.merge`](https://www.npmjs.com/package/@kingjs/descriptor.merge)|`latest`|
|[`@kingjs/dictionary`](https://www.npmjs.com/package/@kingjs/dictionary)|`latest`|
|[`@kingjs/reflect.is`](https://www.npmjs.com/package/@kingjs/reflect.is)|`latest`|
## Source
https://repository.kingjs.net/descriptor/create
## License
MIT

![Analytics](https://analytics.kingjs.net/descriptor/create)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/descriptor
[ns1]: https://www.npmjs.com/package/@kingjs/descriptor.create
