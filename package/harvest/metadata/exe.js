#!/usr/bin/env node --no-warnings
var Path = require('@kingjs/path')
var HarvestMetadata = require('./index.js')
Path.cwd[HarvestMetadata]().then(o => console.log(o))