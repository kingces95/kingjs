var assert = require('assert');

var { 
  ['@kingjs']: {
    reflect: { builtInSymbols }
  }
} = require('./dependencies');

var initialize = require('./initialize');
var { IInterface } = initialize;

// interface should throw when activated
var ActivationError = 'Cannot activate interface.';
var Delimiter = '.';
var Empty = Object.create(null);

var Id = Symbol.for('@kingjs/IInterface.id');

/**
 * @description Returns a function whose properties map strings
 * to symbols which, when defined together on an instance, act as an interface. 
 * 
 * @param id The symbol identifying the interface. The symbol must be registered
 * or be built-in (lives on Symbol). If a string is passed then `Symbol.keyFor`
 * is used to fetch/generate the symbol. 
 * @param descriptor The description of the interfaces this interface
 * extends, and the members that comprise interface this interface.
 * @param descriptor.extends An optional array of interfaces whose members this
 * interfaces inherits.
 * @param descriptor.members An optional object that that provides string aliases for each member's
 * symbol. If the symbol is `null`, then one is fetched/created via `Symbol.keyFor` by
 * joining the interface name and the member name with period. In that case, the 
 * interface `id` must a registered symbol.
 * 
 * @returns Returns a function whose properties are string alias to symbols associated with 
 * interface members.
 * @remarks The returned interface function has the following properties:
 * @remarks - throws if activated.
 * @remarks - has a `null` prototype.
 * @remarks - implements `Symbol.hasInstance` so an instance can be determined to 
 * implement an interface via `myInstance instanceof IMyInterface`. This is why
 * a function was chosen to represent an interface.
 * @remarks - is, itself, an instance that implements `IInterface` so
 * @remarks   - `IMyInterface instanceof IInterface` is `true`
 * @remarks   - defines `IInterface.id` with value `id`
 * @remarks ---
 * @remarks An instance implements an interface if:
 * @remarks - it implements all its extensions
 * @remarks - defines a property for each member using the symbol identifying the member.
 * @remarks - marks itself as implementing the interface by defining a property 
 * using the the interface id as a name (with any value).
 * @remarks   - An interface with a single member can use the same symbol for its own id
 * and that of its single member. This is the case for `IEnumerable`. So that the
 * property `IEnumerable.getEnumerator` provides the implementation of the interface and 
 * also serves as the tag indicating all members of the interface are implemented.
 * @remarks ---
 * @remarks Each interface member has a capitalized alias. 
 * @remarks - This way an interface can be
 * deconstructed into capitalized versions of its members which are less likely
 * to conflict with local variable names.
 * @remarks - For example, `IEnumerable.GetEnumerator` is an alias of 
 * `IEnumerable.getEnumerator`.
 * */
function createInterface(id, descriptor) {

  if (!descriptor)
    descriptor = Empty;

  var {
    members,
    extends: extensions,
  } = descriptor;

  // define interface
  var interface = function() { 
    assert(false, ActivationError); 
  };

  // initialize interface
  var symbolName = initialize.call(interface, id);

  // define members
  for (var member in members) {
    memberId = members[member];

    if (!memberId) {
      assert(symbolName);
      memberId = Symbol.for(symbolName + Delimiter + member);
    }

    // member symbol must be global (or builtin)
    assert(Symbol.keyFor(memberId) || memberId in builtInSymbols);
    interface[member] = memberId;

    // provide a capitalized alias; When consuming an interface, deconstructing
    // into capitalized locals reflect the fact the value is a constant and the
    // name is less likely to conflict with other local variables names. Consider
    // var { Current, MoveNext } = Symbol.kingjs.IEnumerator
    //   vs
    // var { current, moveNext } = Symbol.kingjs.IEnumerator
    var capitalizedMember = member[0].toUpperCase() + member.slice(1);
    if (member != capitalizedMember)
      interface[capitalizedMember] = memberId;
  }

  // inherit extensions
  if (extensions) {

    for (var extension of extensions) {

      // extensions must be interfaces
      assert(extension.constructor == IInterface);
      interface[extension[Id]] = Id;

      // inherit extensions polymorphisms
      for (var inheritedExtension of Object.getOwnPropertySymbols(extension)) {
        if (extension[inheritedExtension] != Id)
          continue;
        interface[inheritedExtension] = Id;
      }
    }
  }

  return interface;
}

createInterface.IInterface = IInterface;
module.exports = createInterface;