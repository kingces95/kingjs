var assert = require('assert')
var { IsLessThan } = require('@kingjs/i-comparable')
var { Equals, GetHashcode } = require('@kingjs/i-equatable')

var regex = /^(\d+)\.(\d+).(\d+)$/

class PackageVersion {

  static parse(version) {
    var { 
      '1': major,
      '2': minor,
      '3': patch
    } = version.match(regex);
  
    return new PackageVersion(major, minor, patch)
  }
  
  constructor(major = 0, minor = 0, patch = 0) {
    this.major = major
    this.minor = minor
    this.patch = patch
  }

  [Equals](other) {
    if (other instanceof PackageVersion == false)
      return false

    return this.major == other.major && 
      this.minor == other.minor &&
      this.patch == other.patch
  }

  [GetHashcode]() {
    var { major, minor, patch } = this

    return major ^ minor ^ patch
  }

  [IsLessThan](other) {
    assert(other instanceof PackageVersion)

    var { major, minor, patch} = this
    var { major: otherMajor, minor: otherMinor, patch: otherPatch } = other

    if (major < otherMajor)
      return true
      
    if (major > otherMajor)
      return false
      
    if (minor < otherMinor)
      return true
      
    if (minor > otherMinor)
      return false
      
    return patch < otherPatch
  }

  toString() {
    var { major, minor, patch} = this
    return `${major}.${minor}.${patch}`
  }
}

module.exports = PackageVersion