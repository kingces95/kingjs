'use strict';
var fs = require('fs');
var path = require('path');
var getFirstJsdoc = require('./first-jsdoc');
var printJoin = require('./print-join');
var packageNameParse = require('./package-name.parse');

var {
  ['@kingjs']: { 
    string: { expand: expandString }
  }
} = require('./dependencies');

var NpmPackageUrl = 'https://www.npmjs.com/package/';
var TemplateName = 'README.t.md';
var ReadmeName = 'README.md';
var PackageName = 'package.json';
var UTF8 = 'utf8';

function expand(templateRelPath, cwd) {
  if (!templateRelPath)
    templateRelPath = TemplateName;

  cwd = process.cwd();

  // parse package.json
  var packagePath = joinPath(cwd, PackageName)
  var pkg = require(packagePath);
  var { 
    main, name, version, description, license, 
    repository: { url: repository },
  } = pkg;
  var pkgInfo = { name, version, description, license, repository };

  // find template
  var templatePath = joinPath(cwd, templateRelPath);
  var expandBasePath = path.dirname(templatePath);
  var stack = [ expandBasePath ];

  // parse package name
  var { namespaces, segments } = packageNameParse(name);

  // parse index.js
  var mainPath = joinPath(cwd, main);
  var mainInfo = getFirstJsdoc(mainPath);

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
    npmjs, namespaces, segments
  };

  // include template
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

    stack.push(expandBasePath);
    expandBasePath = path.dirname(fullPath);
    {
      var text = include(fullPath);
      text = expandString.call(text, descriptor);
    }
    expandBasePath = stack.pop();
    return text;
  }
}

module.exports = expand;