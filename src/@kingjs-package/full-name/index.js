var assert = require('assert')
var { IsLessThan } = require('@kingjs/i-comparable')
var { Equals, GetHashcode } = require('@kingjs/i-equatable')

var EmptyString = ''

var NameRegex = /^([@]([a-z\d-]+)[/])?([a-z\d-_]+)$/
var ScopeCaptureGroup = 2
var NameCaptureGroup = 3

var AtSymbol = '@'
var ForwardSlash = '/'

var GetStringHashcode

class PackageFullName {

  static parse(fullName) {
    var result = fullName.match(NameRegex)
    assert(result)
  
    var scope = result[ScopeCaptureGroup]
    var name = result[NameCaptureGroup]
  
    return new PackageFullName(name, scope)
  }
  
  constructor(name, scope) {
    this.name = name
    this.scope = scope
  }

  [Equals](other) {
    if (other instanceof PackageFullName == false)
      return false

    return this.name == other.name && this.scope == other.scope
  }

  [GetHashcode]() {
    if (!GetStringHashcode)
      GetStringHashcode = require('@kingjs-string/get-hashcode')

    var { name, scope = EmptyString } = this

    return name[GetStringHashcode]() ^ scope[GetStringHashcode]()
  }

  [IsLessThan](other) {
    assert(other instanceof PackageFullName)

    var { 
      name, 
      scope = EmptyString 
    } = this

    var { 
      name: otherName, 
      scope: otherScope = EmptyString 
    } = other

    if (name < otherName)
      return true
      
    if (name > otherName)
      return false

    return scope < otherScope
  }

  toString() {
    var { scope, name } = this
  
    if (!scope)
      return name
  
    return `${AtSymbol}${scope}${ForwardSlash}${name}`
  }
}

module.exports = PackageFullName