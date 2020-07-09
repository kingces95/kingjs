var assert = require('assert')
var { Equals, GetHashcode } = require('@kingjs/i-equatable')
var { IsLessThan } = require('@kingjs/i-comparable')
var FullName = require('@kingjs-package/full-name')
var Version = require('@kingjs-package/version')
var Id = require('@kingjs-package/id')

var otherId = new Id(new FullName('oof', 'emca'), new Version(1, 2, 3))

assert.packageId = function(fullName, version) {
  var id = new Id(fullName, version)

  var { name, scope, major, minor, patch } = id
  assert.equal(name, id.fullName.name)
  assert.equal(scope, id.fullName.scope)
  assert.equal(major, id.version.major)
  assert.equal(minor, id.version.minor)
  assert.equal(patch, id.version.patch)

  var expectedToString = `${fullName.toString()}, v${version.toString()}`
  assert.equal(id.toString(), expectedToString)

  var actual = { fullName: id.fullName, version: id.version }
  var expected = { fullName, version }
  assert.deepEqual(actual, expected)

  var parsedId = Id.parse(fullName.toString(), version.toString())
  assert.ok(id[Equals](parsedId))
  assert.ok(!id[Equals](otherId))
  assert.ok(!id[Equals]())
  
  assert.equal(id[GetHashcode](), parsedId[GetHashcode]())
  assert.notEqual(id[GetHashcode], otherId[GetHashcode]())
}


assert.packageId(new FullName('foo'), new Version(1, 2, 3))

assert.packageId(new FullName('foo', 'acme'), new Version(1, 2, 3))

var aName = new Id(new FullName('a'), new Version(1, 2, 3))
assert.ok(!aName[IsLessThan](aName))

var bName = new Id(new FullName('b'), new Version(1, 2, 3))
assert.ok(aName[IsLessThan](bName))
assert.ok(!bName[IsLessThan](aName))

var aNextName = new Id(new FullName('a'), new Version(1, 2, 4))
assert.ok(aName[IsLessThan](aNextName))
assert.ok(!aNextName[IsLessThan](aName))
assert.ok(aNextName[IsLessThan](bName))
assert.ok(!bName[IsLessThan](aNextName))