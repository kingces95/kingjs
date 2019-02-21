#!/usr/bin/env node
var execute = require('.');
process.chdir('.test');

async function exec() {
  var iterator = execute('.lfx', 'lfx');

  for await (const item of iterator)
    console.log(item);

  return;
}

exec().then();