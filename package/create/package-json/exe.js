#!/usr/bin/env node --no-warnings
var createPackage = require('./index')
createPackage(process.cwd())
  .catch(e => { console.log(e); process.exit(1) })