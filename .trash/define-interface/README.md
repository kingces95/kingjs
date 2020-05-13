# @[kingjs][@kingjs]/[reflect][ns0].[create-interface][ns1]
Returns a function whose properties map strings to symbols which, when defined together on an instance, act as an interface.
## Usage
```js
var assert = require('assert');
var createInterface = require('@kingjs/reflect.create-interface');

var IInterfaceTag = Symbol.for('@kingjs/IInterface');

var IEnumerable = createInterface(
  '@kingjs/IEnumerable', {
    members: { 
      getEnumerator: null,
    }
  }
);
assert(IInterfaceTag in IEnumerable);

// each interface is really just a stripped down function...
assert(IEnumerable instanceof Function);
assert(IEnumerable.name == '@kingjs/IEnumerable');
assert(IEnumerable.prototype == null);
assert(IEnumerable.constructor == null);

// ...that maps strings to symbols where each symbol identifies a member
assert(IEnumerable.getEnumerator == Symbol.for('@kingjs/IEnumerable.getEnumerator'));

// each member has a capitalized alias
assert(IEnumerable.GetEnumerator == IEnumerable.getEnumerator);

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
assert(IEnumerator.current = Symbol.for('@kingjs/IEnumerator.current'));
assert(IEnumerator.moveNext = Symbol.for('@kingjs/IEnumerator.moveNext'));

// make all arrays IEnumerable
Array.prototype[IEnumerable.getEnumerator] = function() {
  var index = -1;
  var current;

  var enumerator = Object.create({
    get [IEnumerator.current]() { 
      return current; 
    },
    [IEnumerator.moveNext]: () => { 
        if (++index >= this.length)
          return false;
        current = this[index];
        return true;
    }
  });

  return enumerator;
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
assert(IIterable.getIterator = Symbol.iterator);

// we can now check if an instance supports Symbol.iterator using
// our IIterable interface using the instanceof operator. Cool!
assert([] instanceof IIterable);
assert('' instanceof IIterable);

// the symbol @kingjs/IInterface.id can also be similarly turned 
// into an interface like this:
var IInterface = createInterface(
  '@kingjs/IInterface'
)
assert(IInterface.name == '@kingjs/IInterface');
assert(IInterface[''] = Symbol.for('@kingjs/IInterface'));

// *head explodes*
assert(IInterface instanceof IInterface);
```

## API
```ts
createInterface(name, descriptor, [object Object])
```

### Parameters
- `name`: The name of the interface. Will be used as a prefix for generating symbol names for parameters.
- `descriptor`: The description of the interfaces this interface extends, and the members that comprise interface this interface.
- `[object Object]`: A map from member names to their symbols. If the symbol  is `null`, then one is fetched/created via `Symbol.keyFor` by joining the interface  name and the member name with period.
### Returns
Returns a function.
### Remarks
The returned interface is a function where
 - every property with a string key will contain
   - a symbol corresponding to an interface member
   - or, when many members share the same name, an arrays of member symbols
---
An instance implements an interface if it declares all an  interface's member symbol.
---
If no members were defined then a default member with an empty string name and symbolic value equal to `Symbol.keyFor(name)` is created. In this case, an  instance implements the interface by defining a property for the the symbol and a value of `null` or `undefined`.
---
Each interface member has a capitalized alias.
 - This way an interface can be deconstructed into capitalized versions of its members which are less likely to conflict with local variable names.
 - For example, `IEnumerable.GetEnumerator` is an alias of  `IEnumerable.getEnumerator`.
---
The returned interface function has the following properties:
 - throws if activated.
 - has a `null` prototype.
 - implements `Symbol.hasInstance` so an instance can be determined to  implement an interface via `myInstance instanceof IMyInterface`. This is why a function was chosen to represent an interface.
 - is, itself, an instance that implements `IInterface` so
   - `IMyInterface instanceof IInterface` is `true`

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/reflect.create-interface
```

## Source
https://repository.kingjs.net/reflect/create-interface
## License
MIT

![Analytics](https://analytics.kingjs.net/reflect/create-interface)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/reflect
[ns1]: https://www.npmjs.com/package/@kingjs/reflect.create-interface
