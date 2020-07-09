var assert = require('assert')
var { Equals, GetHashcode } = require('@kingjs/i-equatable')
var { IsLessThan } = require('@kingjs/i-comparable')
var Version = require('@kingjs-package/version')

var otherVersion = new Version(2, 1, 3)

assert.version = function(major, minor, patch) {
  var expectedToString = `${major || 0}.${minor || 0}.${patch || 0}`

  var packageVersion = new Version(major, minor, patch)
  assert.equal(packageVersion.major, major || 0)
  assert.equal(packageVersion.minor, minor || 0)
  assert.equal(packageVersion.patch, patch || 0)
  assert.equal(packageVersion.toString(), expectedToString)

  var parsedVersion = Version.parse(expectedToString)
  assert.equal(parsedVersion.major, major || 0)
  assert.equal(parsedVersion.minor, minor || 0)
  assert.equal(parsedVersion.patch, patch || 0)
  assert.equal(parsedVersion.toString(), expectedToString)

  assert.ok(packageVersion[Equals](parsedVersion))
  assert.ok(!packageVersion[Equals](otherVersion))
  assert.ok(!packageVersion[Equals]())

  assert.equal(packageVersion[GetHashcode](), parsedVersion[GetHashcode]())
  assert.notEqual(packageVersion[GetHashcode], otherVersion[GetHashcode]())
}

assert.version(0, 0, 0)
assert.version(1, 2, 3)
assert.version(1, 2)
assert.version(1)
assert.version()

var versions = []
for (var major = 0; major < 2; major ++) {
  for (var minor = 0; minor < 2; minor ++) {
    for (var patch = 0; patch < 2; patch ++) {
      versions.push(new Version(major, minor, patch))
    }
  }
}

for (var i = 0; i < versions.length - 1; i++) {
  var versionI = versions[i]
  assert.ok(versionI[Equals](versionI))
  assert.ok(!versionI[Equals](otherVersion))
  assert.ok(!versionI[IsLessThan](versionI))

  for (var j = i + 1; j < versions.length; j++) {
    var versionJ = versions[j]
    assert.ok(versionI[IsLessThan](versionJ))
    assert.ok(!versionJ[IsLessThan](versionI))
  }
}