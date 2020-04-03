#!/usr/bin/env node --no-warnings
var harvestMetadata = require('./index.js')
harvestMetadata(process.cwd()).then(o => console.log(o))