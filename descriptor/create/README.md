# @[kingjs](https://www.npmjs.com/package/kingjs)/[descriptor](https://www.npmjs.com/package/@kingjs/descriptor).create
Returns a descriptor given a primitive value.
## Usage
```js
var create = require('@kingjs/descriptor.create');

var people = {
  alice: { name: 'Alice', age: 21 },
  bob: 'Bob'
}

for (var name in people)
  people[name] = create(people[name], 'name');

people;
```
result:
```js
{
  alice: { name: 'Alice', age: 21 },
  bob: { name: 'Bob' }
}
```
## API
```ts
declare function create(
  value,
  action: string | (value) => Descriptor
): Descriptor
```
### Interfaces
- `Descriptor`: see [@kingjs/descriptor][descriptor]
### Parameters
- `value`: The value to create into a descriptor.
- `action`: The name of the property to hold `value` or a function that accepts `value` and returns a descriptor. 
### Returns
Returns `value` if already a descriptor, else a normalized descriptor for value.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/descriptor.create
```
## License
MIT

![Analytics](https://analytics.kingjs.net/descriptor/create)

  [descriptor]: https://www.npmjs.com/package/@kingjs/descriptor