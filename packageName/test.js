'use strict';

var PackageName = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');

function readMe() {
  var scope = 'scope';
  var name = 'name';

  var scopeName = new PackageName(name, scope);
  assert(scopeName.scope == scope);
  assert(scopeName.name == name);

  var packageName = '@scope/name'
  assert(scopeName.toString() == packageName);
  assert(PackageName.parse(packageName).equals(scopeName));
}
readMe();

function justName() {
  var name = 'name';

  var scopeName = new PackageName(name);
  assert(scopeName.scope === null);
  assert(scopeName.name == name);

  var packageName = 'name'
  assert(scopeName.toString() == packageName);
  assert(PackageName.parse(packageName).equals(scopeName));
}
justName();