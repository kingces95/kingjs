#!/usr/bin/env node --no-warnings
var Path = require('@kingjs/path.builder')
var HarvestMetadata = require('./index.js')
Path.cwd[HarvestMetadata]().then(o => console.log(o))