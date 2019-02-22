#!/usr/bin/env node
process.chdir('.test/.lfx');
var execute = require('.');
execute().then();