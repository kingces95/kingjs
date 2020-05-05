var assert = require('assert');

var { 
  ['@kingjs']: {
    stringEx: { Capitalize },
    reflect: { is, builtInSymbols }
  }
} = module[require('@kingjs-module/dependencies')]();

var IInterfaceTag = Symbol.for('@kingjs/IInterface');

// interface should throw when activated
var ActivationError = 'Cannot activate interface.';
var Delimiter = '.';
var EmptyObject = { };

/**
 * @description Returns a function whose properties map strings
 * to symbols which, when defined together on an instance, act as an interface. 
 * 
 * @param name The name of the interface. Will be used as a prefix for generating
 * symbol names for parameters. 
 * @param descriptor The description of the interfaces this interface
 * extends, and the members that comprise interface this interface.
 * @param descriptor.extends An optional array of interfaces whose members this
 * interfaces inherits.
 * @param descriptor.members A map from member names to their symbols. If the symbol 
 * is `null`, then one is fetched/created via `Symbol.keyFor` by joining the interface 
 * name and the member name with period. 
 * 
 * @returns Returns a function.
 * 
 * @remarks The returned interface is a function where
 * @remarks - every property with a string key will contain 
 * @remarks -- a symbol corresponding to an interface member
 * @remarks -- or, when many members share the same name, an arrays of member symbols
 * @remarks ---
 * @remarks An instance implements an interface if it declares all an 
 * interface's member symbol.
 * @remarks ---
 * @remarks If no members were defined then a default member with an empty string name
 * and symbolic value equal to `Symbol.keyFor(name)` is created. In this case, an 
 * instance implements the interface by defining a property for the the symbol
 * and a value of `null` or `undefined`.
 * @remarks ---
 * @remarks Each interface member has a capitalized alias. 
 * @remarks - This way an interface can be
 * deconstructed into capitalized versions of its members which are less likely
 * to conflict with local variable names.
 * @remarks - For example, `IEnumerable.GetEnumerator` is an alias of 
 * `IEnumerable.getEnumerator`.
 * @remarks ---
 * @remarks The returned interface function has the following properties:
 * @remarks - throws if activated.
 * @remarks - has a `null` prototype.
 * @remarks - implements `Symbol.hasInstance` so an instance can be determined to 
 * implement an interface via `myInstance instanceof IMyInterface`. This is why
 * a function was chosen to represent an interface.
 * @remarks - is, itself, an instance that implements `IInterface` so
 * @remarks -- `IMyInterface instanceof IInterface` is `true`
 * */
function createInterface(name, descriptor) {
  assert(is.string(name));

  if (!descriptor)
    descriptor = EmptyObject;

  var {
    members,
    extends: extensions,
  } = descriptor;

  // define interface
  var iface = function() { 
    assert(false, ActivationError); 
  };

  // interface name is the keyFor its symbolic id
  Object.defineProperty(iface, 'name', { value: name });

  // remove prototype & ctor (because it's never activated)
  Object.defineProperty(iface, 'prototype', { value: null });
  Object.defineProperty(iface, 'constructor', { value: null });

  // support instanceof
  Object.defineProperty(iface, Symbol.hasInstance, {
    value: hasInstance
  });

  // Tag as an interface
  iface[IInterfaceTag] = null;

  // gather extensions
  iface = Object.create(iface);
  if (extensions)
    inheritExtensions.call(iface, extensions);

  // gather members
  iface = Object.create(iface);
  if (members)
    defineMembers.call(iface, members, name);
  else
    iface[''] = Symbol.for(name);

  return iface;
}

// intercept instanceof; used by extension stubs to test type
function hasInstance(instance) {

  var isObjectStringOrFunction =
    is.object(instance) || is.string(instance) || is.function(instance);

  if (!isObjectStringOrFunction)
    return false;

  var prototype = Object.getPrototypeOf(instance);
  if (!prototype)
    return false;

  // test that declared members are implemented
  var iface = this;
  for (var name of Object.getOwnPropertyNames(iface)) {
    var symbol = iface[name];
    if (symbol in prototype == false)
      return false;    
  }
  
  // test that inherited members are implemented
  iface = Object.getPrototypeOf(iface);
  for (var name of Object.getOwnPropertyNames(iface)) {
    var symbolOrSymbols = iface[name];

    // a name may be associated with many members
    if (is.object(symbolOrSymbols)) {
      for (var symbol of Object.getOwnPropertySymbols(symbolOrSymbols)) {
        if (symbol in prototype == false)
          return false;
      }
    }

    else if (symbolOrSymbols in prototype == false)
      return false;    
  }

  return true;
}

function inheritExtensions(extensions) {
  if (!is.array(extensions))
    extensions = [ extensions ];

  for (var extension of extensions) {

    // extensions must be interfaces
    assert(IInterfaceTag in extension);

    inherit.call(this, Object.getPrototypeOf(extension));
    inherit.call(this, extension);
  }
}
function inherit(extension) {

    // inherit all members
    for (var name of Object.getOwnPropertyNames(extension)) {
      var symbol = extension[name];

      // copy
      if (is.object(symbol))
        symbol = { ...symbol };

      if (name in this) {

        // allocate object to hold overloads
        var overloads = this[name];
        if (!is.object(overloads))
          this[name] = overloads = { [overloads]: null };

        // merge overloads
        if (is.object(symbol))
          overloads = { ...overloads, ...symbol };
        else
          overloads[symbol] = null;
      } 

      // no overloads
      else
        this[name] = symbol;
    }
  }

function defineMembers(members, interfaceName) {

  // define members
  for (var name in members) {
    var symbol = members[name];

    if (!symbol)
      symbol = Symbol.for(interfaceName + Delimiter + name);
    assert(Symbol.keyFor(symbol) || symbol in builtInSymbols);

    this[name] = symbol;

    // provide a capitalized alias; When consuming an interface, deconstructing
    // into capitalized locals reflect the fact the value is a constant and the
    // name is less likely to conflict with other local variables names. Consider
    // var { Current, MoveNext } = Symbol.kingjs.IEnumerator
    //   vs
    // var { current, moveNext } = Symbol.kingjs.IEnumerator
    this[name[Capitalize]()] = this[name];
  }
}

module.exports = createInterface;