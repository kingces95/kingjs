#!/usr/bin/env node
var expand = require('./index')
process.chdir('.test')
expand().catch(e => console.log(e))