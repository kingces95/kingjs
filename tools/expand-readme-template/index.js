#!/usr/bin/env node
'use strict';
var fs = require('fs');
var path = require('path');
var parse = require('./parse');
var print = require('./print');
var printJoin = require('./print-join');
var packageNameParse = require('./package-name.parse');

var NpmPackageUrl = 'https://www.npmjs.com/package/';
var TemplateName = 'README.t.md';
var ReadmeName = 'README.md';
var PackageName = 'package.json';
var UTF8 = 'utf8';

var cwd = process.cwd();
cwd = path.join(cwd, 'test');

// parse package.json
var packagePath = path.join(cwd, PackageName)
var pkg = require(packagePath);
var { 
  main, name, version, description, license, 
  repository: { url: repository },
  readmeTemplate
} = pkg;
var pkgInfo = { name, version, description, license, repository };

var templateRelPath = TemplateName;
if (readmeTemplate)
  templateRelPath = require.resolve(readmeTemplate, { paths: [ cwd ] });

// parse package name
var { namespaces, segments } = packageNameParse(name);

// parse index.js
var mainPath = path.join(cwd, main);
var mainInfo = parse(mainPath);

// gather substitutions
var npmjs = NpmPackageUrl;
var join = (template, source, separator, keys) => 
  printJoin(template, descriptor, source, separator, keys);
var descriptor = {
  ...mainInfo, 
  ...pkgInfo, 
  npmjs,
  expand, include, join, 
  namespaces, segments
};

// include template
var result = expand(templateRelPath);
var readmePath = path.join(cwd, ReadmeName);
fs.writeFileSync(readmePath, result);
return;

function include(relPath) {
  var fullPath = path.isAbsolute(relPath) ? relPath : path.join(cwd, relPath);
  var text = fs.readFileSync(fullPath, UTF8);
  return text;
}

function expand(relPath) {
  var text = include(relPath);
  text = print(text, descriptor);
  return text;
}

