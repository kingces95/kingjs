#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');

const PackageName = 'package.json';
const NewLine = '\n';
const EmptyString = '';

var { 
  '0': node,
  '1': index,
} = process.argv;

const cwd = process.cwd();
const packagePath = path.join(cwd, PackageName)
const pkg = require(packagePath);
const pkgNames = Object.getOwnPropertyNames(pkg);
const pkgValues = pkgNames.map(x => pkg[x]);

if (!pkg.kingjs)
  return;

var result = [];
var hashes = []

function headers() {
  hashes.push('#');

  for (var header in this) {
    var value = this[header];

    if (header)
      result.push(`${hashes.join(EmptyString)} ${header}`)

    if (value instanceof Array)
      result.push(...value);
    else if (typeof value == 'string')
      result.push(value);
    else if (typeof value == 'object')
      headers.call(value);
  }

  hashes.pop();
}
headers.call(pkg.kingjs);

var doc = {
  load: x => fs.readFileSync(x),
  header: () => 'HEADER'
}

function substitute(line) {
  line = line.replace(/`/g, '\\`')
  var expand = Function(...pkgNames, 'doc', `return \`${line}\`;`);
  return expand(...pkgValues, doc);
}

result = result.map(x => substitute(x));
process.stdout.write(result.join(NewLine));