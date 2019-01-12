#!/usr/bin/env node
'use strict';
var fs = require('fs');
var path = require('path');
var compile = require('./compile');

var PackageName = 'package.json';
var NewLine = '\n';
var EmptyString = '';

var { 
  '0': node,
  '1': index,
} = process.argv;

var cwd = process.cwd();
var packagePath = path.join(cwd, PackageName)
var pkg = require(packagePath);

if (!pkg.kingjs)
  return;

var doc = {
  read: x => fs.readFileSync(x),
  parseDeclaration: x => compile(path.join(cwd, x)),
  header: () => 'HEADER'
}

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

function substitute(line, descriptor) {
  var names = Object.getOwnPropertyNames(descriptor);
  var values = names.map(x => descriptor[x]);

  line = line.replace(/`/g, '\\`')
  var expand = Function(...names, `return \`${line}\`;`);
  var result = expand(...values);
  return result;
}

result = result.map(x => substitute(x, { ...pkg, doc: doc }));
process.stdout.write(result.join(NewLine));