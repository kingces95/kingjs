# @[kingjs][@kingjs]/[reflect][ns0].[create-interface][ns1]
Returns a function whose properties map strings to symbols which when defined together act as an interface.
## Usage
```js
var assert = require('assert');
var createInterface = require('@kingjs/reflect.create-interface');

var IEnumerableId = Symbol.for('@kingjs/IEnumerable');
var GetEnumeratorId = Symbol.for('@kingjs/IEnumerable.getEnumerator');

var IEnumerable = createInterface(
  IEnumerableId, {
    members: { 
      getEnumerator: GetEnumeratorId,
    }
  }
);

// each interface is really just a stripped down function...
assert(IEnumerable instanceof Function);
assert(IEnumerable.name == '@kingjs/IEnumerable');
assert(IEnumerable.prototype == null);
assert(IEnumerable.constructor == null);

// ...that maps strings to symbols where each symbol identifies a member
assert(IEnumerable.getEnumerator == GetEnumeratorId);

// each member has a capitalized alias
assert(IEnumerable.GetEnumerator == GetEnumeratorId);

// the interface's Id is stored in '@kingjs/IInterface.id'
var Id = Symbol.for('@kingjs/IInterface.id');
assert(IEnumerable[Id] == IEnumerableId);

// create an interface without explicitly providing any symbols
var IEnumerator = createInterface(
  '@kingjs/IEnumerator', {
    members: {
      current: null,
      moveNext: null
    }
  }
)
assert(IEnumerator.name == '@kingjs/IEnumerator');
assert(IEnumerator[Id] == Symbol.for('@kingjs/IEnumerator'));
assert(IEnumerator.current = Symbol.for('@kingjs/IEnumerator.current'));
assert(IEnumerator.moveNext = Symbol.for('@kingjs/IEnumerator.moveNext'));

// make all arrays IEnumerable
Array.prototype[IEnumerable[Id]] = null;
Array.prototype[IEnumerable.getEnumerator] = function() {
  var index = -1;
  var current;

  return Object.defineProperties({ }, {
    [IEnumerator[Id]]: { 
      value: null 
    },
    [IEnumerator.current]: { 
      get: () => current 
    },
    [IEnumerator.moveNext]: { 
      value: () => {
        if (++index >= this.length)
          return false;
        current = this[index];
        return true;
      }
    }
  })
}
assert([] instanceof IEnumerable);

// enumerate an array using IEnumerable
var array = [ 0 ];
var enumerator = array[IEnumerable.getEnumerator]();
assert(enumerator instanceof IEnumerator);
assert(enumerator[IEnumerator.moveNext]());
assert(enumerator[IEnumerator.current] == 0);
assert(!enumerator[IEnumerator.moveNext]());

// single member interfaces use the single member's id for the interface id
// when the interface id is a string and a symbol is provided for the member
var IIterable = createInterface(
  '@kingjs/IIterable', {
    members: { 
      getIterator: Symbol.iterator 
    }
  }
)
assert(IIterable.name == '@kingjs/IIterable');
assert(IIterable[Id] == Symbol.iterator);
assert(IIterable.getIterator = Symbol.iterator);

// we can now check if an instance supports Symbol.iterator using
// our IIterable interface using the instanceof operator. Cool!
assert([] instanceof IIterable);
assert('' instanceof IIterable);

// the symbol @kingjs/IInterface.id can also be similarly turned 
// into an interface like this:
var Id = Symbol.for('@kingjs/IInterface.id');
var IInterface = createInterface(
  '@kingjs/IInterface', {
    members: {
      id: Id
    }
  }
)

// *head explodes*
assert(IInterface instanceof IInterface);
```

## API
```ts
createInterface(id, descriptor)
```

### Parameters
- `id`: The symbol identifying the interface. The symbol must be registered or be built-in (lives on Symbol). If a string is passed then `Symbol.keyFor` is used to fetch/generate the symbol.
- `descriptor`: The description of the interfaces this interface extends, and the members that comprise interface this interface.
- `descriptor.extends`: An optional array of interfaces whose members this interfaces inherits.
- `descriptor.members`: An optional object that that provides string aliases for each member's symbol. If the symbol is `null`, then one is fetched/created via `Symbol.keyFor` by joining the interface name and the member name with period. In that case, the  interface `id` must a registered symbol.
### Returns
Returns a function whose properties are string alias to symbols associated with  interface members.
### Remarks
The returned interface function has the following properties:
- throws if activated.
- has a `null` prototype.
- implements `Symbol.hasInstance` so an instance can be determined to  implement an interface via `myInstance instanceof IMyInterface`. This is why a function was chosen to represent an interface.
- is, itself, an instance that implements `IInterface` so
  - `IMyInterface instanceof IInterface` is `true`
  - defines `IInterface.id` with value `id`
---
An instance implements an interface if:
- it implements all its extensions
- defines a property for each member using the symbol identifying the member.
- marks itself as implementing the interface by defining a property  using the the interface id as a name (with any value).
  - An interface with a single member can use the same symbol for its own id and that of its single member. This is the case for `IEnumerable`. So that the property `IEnumerable.getEnumerator` provides the implementation of the interface and  also serves as the tag indicating all members of the interface are implemented.
---
Each interface member has a capitalized alias.
- This way an interface can be deconstructed into capitalized versions of its members which are less likely to conflict with local variable names.
- For example, `IEnumerable.GetEnumerator` is an alias of  `IEnumerable.getEnumerator`.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/reflect.create-interface
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/reflect.built-in-symbols`](https://www.npmjs.com/package/@kingjs/reflect.built-in-symbols)|`^1.0.0`|
## Source
https://repository.kingjs.net/reflect/create-interface
## License
MIT

![Analytics](https://analytics.kingjs.net/reflect/create-interface)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/reflect
[ns1]: https://www.npmjs.com/package/@kingjs/reflect.create-interface
