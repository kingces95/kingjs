var assert = require('assert')
var { Equals, GetHashcode } = require('@kingjs/i-equatable')
var { IsLessThan } = require('@kingjs/i-comparable')
var FullName = require('@kingjs-package/full-name')

var otherName = new FullName('oof', 'emca')

assert.packageName = function(name, scope) {
  var expectedFullName = scope ? `@${scope}/${name}` : name

  var packageName = new FullName(name, scope)
  assert.equal(packageName.name, name)
  assert.equal(packageName.scope, scope)
  assert.equal(packageName.toString(), expectedFullName)

  var parsedName = FullName.parse(expectedFullName)
  assert.equal(parsedName.name, name)
  assert.equal(parsedName.scope, scope)
  assert.equal(parsedName.toString(), expectedFullName)

  assert.ok(packageName[Equals](parsedName))
  assert.ok(!packageName[Equals](otherName))
  assert.ok(!packageName[Equals]())

  assert.equal(packageName[GetHashcode](), parsedName[GetHashcode]())
  assert.notEqual(packageName[GetHashcode], otherName[GetHashcode]())
}

assert.packageName('foo')
assert.packageName('foo', 'acme')

var aName = new FullName('a')
assert.ok(!aName[IsLessThan](aName))

var bName = new FullName('b')
assert.ok(aName[IsLessThan](bName))
assert.ok(!bName[IsLessThan](aName))

var aAcmeName = new FullName('a', 'acme')
assert.ok(aName[IsLessThan](aAcmeName))
assert.ok(!aAcmeName[IsLessThan](aName))
assert.ok(aAcmeName[IsLessThan](bName))
assert.ok(!bName[IsLessThan](aAcmeName))