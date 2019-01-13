#!/usr/bin/env node
'use strict';
var fs = require('fs');
var path = require('path');
var parse = require('./parse');
var print = require('./print');
var printLines = require('./print-lines');
var packageNameParse = require('./package-name.parse');

var NpmPackageUrl = 'https://www.npmjs.com/package/';
var TemplateName = 'README.t.md';
var PackageName = 'package.json';
var UTF8 = 'utf8';

var cwd = process.cwd();

// parse package.json
var packagePath = path.join(cwd, PackageName)
var pkg = require(packagePath);
var { main, name, version, description, license, repository } = pkg;
var pkgInfo = { name, version, description, license, repository };

// parse package name
var { paths } = packageNameParse(name);

// parse index.js
var mainPath = path.join(cwd, main);
var mainInfo = parse(mainPath);

// gather substitutions
var npmjs = NpmPackageUrl;
var lines = (template, source, keys) => 
  printLines(template, descriptor, source, keys);
var descriptor = { 
  ...mainInfo, 
  ...pkgInfo, 
  lines, include, npmjs, paths
};

// include template
var result = include(TemplateName);
console.log(result);
return;

function include(relPath) {
  var fullPath = path.join(cwd, relPath);
  var text = fs.readFileSync(fullPath, UTF8);
  text = print(text, descriptor);
  return text;
}

/**
 * @this any This comment
 * @param foo Foo comment
 * @param [bar] Bar comment
 * @param [baz] Baz comment
 * @returns Returns comment
 */
function example(foo, bar, baz) { }
