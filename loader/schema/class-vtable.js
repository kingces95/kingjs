//'use strict';

var assert = require('assert');

function createVtable() {
  if (!this.isClass)
    return null;

  var baseVtable = this.base ? this.base.vtable : null;

  // inherit vtable members
  var vtable = Object.create(baseVtable);

  // add newly defined members
  for (var name in this.children) {
    var member = this.children[name];
    if (!member.isProcedural)
      continue;

    vtable[name] = member;
  }

  // update interface implementations
  for (var id of Object.getOwnPropertySymbols(this.interfaceMap)) {
    var member = this.interfaceMap[id];
    if (vtable[id] == member)
      continue;

    vtable[id] = member;
  }

  return vtable;
}

Object.defineProperties(module, {
  exports: { value: createVtable }
});