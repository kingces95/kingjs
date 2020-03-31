#!/usr/bin/env node --no-warnings
var harvestMetadata = require('./index.js')
harvestMetadata().then(o => console.log(o))