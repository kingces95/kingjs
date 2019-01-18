#!/usr/bin/env node
'use strict';
var fs = require('fs');
var path = require('path');
var parse = require('./parse');
var print = require('./print');
var printJoin = require('./print-join');
var packageNameParse = require('./package-name.parse');

var { name: toolName, version: toolVersion } = require('./package.json');
console.log(`${toolName}, v${toolVersion}`)
var EmptyString = '';
var Tab = '  ';
var tabs = [ Tab ];

var NpmPackageUrl = 'https://www.npmjs.com/package/';
var TemplateName = 'README.t.md';
var ReadmeName = 'README.md';
var PackageName = 'package.json';
var UTF8 = 'utf8';

var cwd = process.cwd();

// parse package.json
var packagePath = joinPath(cwd, PackageName)
var pkg = require(packagePath);
var { 
  main, name, version, description, license, 
  repository: { url: repository },
  readmeTemplate
} = pkg;
var pkgInfo = { name, version, description, license, repository };

var templatePath = joinPath(cwd, TemplateName);
if (readmeTemplate)
  templatePath = require.resolve(readmeTemplate, { paths: [ cwd ] });
var expandBasePath = path.dirname(templatePath);

// parse package name
var { namespaces, segments } = packageNameParse(name);

// parse index.js
var mainPath = joinPath(cwd, main);
var mainInfo = parse(mainPath);

// gather substitutions
var npmjs = NpmPackageUrl;
var join = (template, source, separator, keys) => 
  printJoin(template, descriptor, source, separator, keys);
var descriptor = {
  ...mainInfo, 
  ...pkgInfo, 
  join,
  expand, canExpand, 
  include, canInclude,
  npmjs,namespaces, segments
};

// include template
console.log('Expanding template: ' + templatePath);
var result = expand(templatePath);
var readmePath = joinPath(cwd, ReadmeName);
fs.writeFileSync(readmePath, result);
return;

function joinPath(basePath, relPath) {
  if (path.isAbsolute(relPath))
    return relPath;
  return path.join(basePath, relPath);
}

function joinIncludePath(relPath) {
  return joinPath(cwd, relPath);
}

function joinExpandPath(relPath) {
  return joinPath(expandBasePath, relPath);
}

function canInclude(relPath) {
  return fs.existsSync(joinIncludePath(relPath));
}

function canExpand(relPath) {
  return fs.existsSync(joinExpandPath(relPath));
}

function include(relPath) {
  var fullPath = joinIncludePath(relPath); 
  var text = fs.readFileSync(fullPath, UTF8);
  return text;
}

function expand(relPath) {
  var fullPath = joinExpandPath(relPath);

  relPath = path.relative(expandBasePath, fullPath);
  console.log(`${tabs.join(EmptyString)}${relPath}`);
  
  tabs.push(Tab);
  var text = include(fullPath);
  text = print(text, descriptor);
  tabs.pop(Tab);

  return text;
}

