//'use strict';
var assert = require('assert');
var builtInSymbols = require('@kingjs/built-in-symbols');

var initialize = require('./initialize');
var { IInterface } = initialize;

// interface should throw when activated
var ActivationError = 'Cannot activate interface.';
var Delimiter = '.';
var Empty = Object.create(null);

var Id = Symbol.for('@kingjs/IInterface.id');

function defineInterface(target, name, descriptor) {

  if (!descriptor)
    descriptor = Empty;

  var {
    members,
    extends: extensions,
    enumerable,
    configurable,
    writable
  } = descriptor;

  // define interface
  var interface = function() { assert(false, ActivationError); };
  Object.defineProperty(interface, 'name', {
    enumerable: true,
    value: name
  });

  // initialize interface
  var symbolName = initialize.call(interface, descriptor.id);

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
  var extensions = descriptor.extends;
  if (extensions) {

    for (var extension of extensions) {

      // extensions must be interfaces
      assert(extension.constructor == IInterface);
      interface[extension[Id]] = Id;

      // inherit extensions polymorphisms
      for (var inheritedExtension of Object.getOwnPropertySymbols(extension)) {
        if (extension[inheritedExtension] != Id)
          continue;
        interface[symbol] = Id;
      }
    }
  }

  // define property!
  return Object.defineProperty(target, name, {
    configurable, 
    enumerable, 
    writable,
    value: interface,
  });
}

defineInterface.IInterface = IInterface;
module.exports = defineInterface;