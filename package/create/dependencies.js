exports['@kingjs'] = {
  array: {
    promises: {
      AsyncMap: require('@kingjs/array.promises.map')
    }
  },
  camelCase: {
    split: require('@kingjs/camel-case.split'),
  },
  git: {
    getDir: require('@kingjs/git.get-dir'),
  },
  package: { 
    findNpmScope: require('@kingjs/package.find-npm-scope'),
    name: {
      parse: require('@kingjs/package.name.parse'),
      construct: require('@kingjs/package.name.construct'),
    },
    harvest: {
      dependencies: require('@kingjs/package.harvest.dependencies'),
      metadata: require('@kingjs/package.harvest.metadata'),
    },
    source: {
      objectBindingPattern: {
        ToPackageNames: require('@kingjs/package.source.object-binding-pattern.to-package-names')
      },
      sourceFile: {
        GetDependencies: require('@kingjs/package.source.source-file.get-dependencies'),
        GetFirstDocumented: require('@kingjs/package.source.source-file.get-first-documented')
      }
    }
  },
  fs: {
    promises: {
      exists: require('@kingjs/fs.promises.exists')
    }
  },
  source: {
    parse: require('@kingjs/source.parse'),
    GetInfo: require('@kingjs/source.get-info'),
  },
  reflect: {
    is: require('@kingjs/reflect.is'),
  },
  stringEx: {
    ReplaceAll: require('@kingjs/string-ex.replace-all'),
  },
}
exports['isBuiltinModule'] = require('is-builtin-module')
exports['npmPacklist'] = require('npm-packlist')
exports['assert'] = require('assert')
exports['fs'] = require('fs')
exports['Path'] = require('path')