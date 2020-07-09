var assert = require('assert')
var Version = require('@kingjs-package/version')
var FullName = require('@kingjs-package/full-name')
var { IsLessThan } = require('@kingjs/i-comparable')
var { Equals, GetHashcode } = require('@kingjs/i-equatable')

class PackageId {

  static parse(name, version) {
    return new PackageId(
      FullName.parse(name),
      Version.parse(version)
    )
}

  constructor(fullName, version = new Version()) {
    assert(fullName instanceof FullName)
    assert(version instanceof Version)

    this.fullName = fullName
    this.version = version
  }

  get name() { return this.fullName.name }
  get scope() { return this.fullName.scope }
  get major() { return this.version.major }
  get minor() { return this.version.minor }
  get patch() { return this.version.patch }

  [Equals](other) {
    if (other instanceof PackageId == false)
      return false

    var { fullName, version } = this
    var { fullName: otherFullName, version: otherVersion } = other

    return fullName[Equals](otherFullName) && version[Equals](otherVersion)
  }

  [GetHashcode]() {
    var { fullName, version } = this

    return fullName[GetHashcode]() ^ version[GetHashcode]()
  }

  [IsLessThan](other) {
    assert(other instanceof PackageId)

    var { fullName, version } = this
    var { fullName: otherFullName, version: otherVersion } = other

    if (fullName[IsLessThan](otherFullName))
      return true
      
    if (otherFullName[IsLessThan](fullName))
      return false

    return version[IsLessThan](otherVersion)
  }

  toString() {
    var { fullName, version } = this
    return `${fullName.toString()}, v${version.toString()}`
  }
}

module.exports = PackageId