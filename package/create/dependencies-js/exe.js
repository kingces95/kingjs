#!/usr/bin/env node --no-warnings
var createDependencies = require('./index')
createDependencies(process.cwd())
  .catch(e => { console.log(e); process.exit(1) })