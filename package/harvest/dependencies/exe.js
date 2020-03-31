#!/usr/bin/env node --no-warnings
var harvestDependencies = require('./index.js')
harvestDependencies().then(o => console.log(o))