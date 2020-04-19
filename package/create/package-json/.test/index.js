var assert = require('assert')
var Path = require('@kingjs/path.builder')
var Save = require('@kingjs/fs.promises.save')
var Load = require('@kingjs/fs.promises.load')
var Remove = require('@kingjs/fs.promises.dir.remove')
var CreatePackageJson = require('..')

var Acme = 'acme'
var MyNs = 'my-ns'
var Foo = 'foo'
var Bar = 'bar'
var Baz = 'baz'
var Moo = 'moo'
var DotTemplate = '.template'
var DotTest = '.test'
var PackageJson = 'package.json'
var NpmScopeJson = 'npm-scope.json'
var IndexJs = 'index.js'
var indexJs = `
var {
  assert,
  ['@acme']: {
    myNs: {
      foo: a
    }
  }
} = require('./dependencies')

/**
 * @description A description of the package B.
 */
function b() { 
  return a()
}

module.exports = b`
var npmScopeJson = {
  "name": "acme",
  "repository": {
    "url": "https://repository.acme.net/",
    "type": "git"
  },
  "packageDefaults": {
    "main": "index.js",
    "files": [ "*.js" ],
    "license": "MIT"
  },
  "template": ".template"
}

async function run() {
  var acme = Path.parse(Acme)
  await acme[Remove]()

  await acme[Save]({
    [MyNs]: {
      [Foo]: { [IndexJs]: `module.exports = 42`, },
      [Bar]: { [IndexJs]: indexJs }
    },
    [NpmScopeJson]: npmScopeJson
  })

  var myNs = acme.to(MyNs)
  await myNs.to(Bar)[CreatePackageJson]()
  await myNs.to(Baz)[CreatePackageJson]()

  var {
    [MyNs]: {
      [Bar]: { [PackageJson]: barPackageJson },
      [Baz]: { [PackageJson]: bazPackageJson },
    }
  } = await acme[Load]()

  var defaultPackage = {
    version: "0.0.0",
    main: "index.js",
    files: ['*.js'],
    description: "",
    license: "MIT",
    dependencies: { },
    nodeDependencies: [ ]
  }

  assert.deepEqual({
    ...defaultPackage,
    name: "@acme/my-ns.bar",
    description: "A description of the package B.",
    repository: {
      type: "git",
      url: "https://repository.acme.net/my-ns/bar"
    },
    dependencies: { "@acme/my-ns.foo": "file:../foo" },
    nodeDependencies: [ "assert" ]
  }, barPackageJson)
  
  assert.deepEqual({
    ...defaultPackage,
    name: "@acme/my-ns.baz",
    repository: {
      type: "git",
      url: "https://repository.acme.net/my-ns/baz"
    },
    dependencies: { },
    nodeDependencies: [ ]
  }, bazPackageJson)

  await acme[Save]({
    [DotTemplate]: {
      [IndexJs]: "var assert = require('assert')",
      [PackageJson]: {
        name: null,
        version: null,
        description: null,
        specialSauce: 'hot',
        files: [ '*.js' ]
      },
      [DotTest]: {
        [IndexJs]: "var me = require('..')"
      } 
    },
    [NpmScopeJson]: npmScopeJson
  })

  await myNs.to(Moo)[CreatePackageJson]()
  var { 
    [MyNs]: { 
      [Moo]: { 
        [PackageJson]: mooPackageJson,
        [IndexJs]: mainText,
        [DotTest]: { [IndexJs]: testText }
      } 
    } 
  } = await acme[Load]()

  assert.equal(mainText, "var assert = require('assert')")
  assert.equal(testText, "var me = require('..')")
  assert.deepEqual({
    ...defaultPackage,
    name: "@acme/my-ns.moo",
    repository: {
      type: "git",
      url: "https://repository.acme.net/my-ns/moo"
    },
    specialSauce: 'hot',
    dependencies: { },
    nodeDependencies: [ ]
  }, mooPackageJson)

  await acme[Remove]()
}
run().catch(e => console.log(e))
