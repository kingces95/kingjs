var assert = require('assert')
var generateDependencies = require('..')

var package = {
  dependencies: {
    '@acme/my-ns.foo': 'file:../foo',
    '@acme/my-ns.bar': 'file:../bar'
  },
  nodeDependencies: [ 'path', 'child_process' ],
}

var options = {
  capitalize: {
    '@acme/my-ns.bar': true
  }
}

var dependenciesJs = generateDependencies(package, options)

assert.equal(`module.exports = {
  Path: require("path"),
  childProcess: require("child_process"),
  "@acme": {
    myNs: {
      foo: require("@acme/my-ns.foo"),
      Bar: require("@acme/my-ns.bar")
    }
  }
}`, dependenciesJs)