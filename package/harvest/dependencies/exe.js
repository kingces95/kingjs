#!/usr/bin/env node --no-warnings
var Path = require('@kingjs/path.builder')
var HarvestDependencies = require('./index.js')
Path.cwd[HarvestDependencies]().then(o => console.log(o))