var assert = require('assert')
var { Equals } = require('@kingjs/i-equatable')
var FullName = require('@kingjs-package/full-name')
var Version = require('@kingjs-package/version')
var Package = require('@kingjs-package/package')
var Id = require('@kingjs-package/id')

var package = Package.fromPath(module.path)
var { id, fullName, version, name, scope, major, minor, patch, camelCaseName } = package

assert.equal(camelCaseName, 'Package')

assert.ok(fullName instanceof FullName)
assert.equal(name, fullName.name)
assert.equal(scope, fullName.scope)

assert.ok(version instanceof Version)
assert.equal(major, version.major)
assert.equal(minor, version.minor)
assert.equal(patch, version.patch)

assert.ok(id[Equals](new Id(fullName, version)))