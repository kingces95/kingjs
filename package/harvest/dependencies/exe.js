#!/usr/bin/env node --no-warnings
var harvestDependencies = require('./index.js')
//var path = process.cwd()
var path = '/Users/Setup/git/kingjs/package/harvest/dependencies/.test/acme/my-ns'
harvestDependencies(path).then(o => console.log(o))