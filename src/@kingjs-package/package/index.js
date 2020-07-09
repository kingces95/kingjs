var Path = require('path')
var Id = require('@kingjs-package/id')
var Join = require('@kingjs-camel-case/join')

var EmptyObject = { }
var PackageJson = 'package.json'
var Dash = '-'

class Package {

  static fromPath(path) {
    var json = require(Path.join(path, PackageJson))
    var { name, version } = json
    return new Package(Id.parse(name, version), json)
  }
  
  constructor(id, options = EmptyObject) {
    this.id = id
    this.camelCaseName = id.name.split(Dash)[Join]({ 
      capitalize: options.capitalize 
    })
  }

  get fullName() { return this.id.fullName }
  get name() { return this.fullName.name }
  get scope() { return this.fullName.scope }

  get version() { return this.id.version }
  get major() { return this.version.major }
  get minor() { return this.version.minor }
  get patch() { return this.version.patch }

  toString() { return this.id.toString() }
}

module.exports = Package