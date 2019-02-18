var {
  fs, path,
  ['@kingjs']: { 
    git: { getDir },
    stringEx: { ReplaceAll }
  },
  npmPacklist,
  isBuiltinModule,
} = require('./dependencies');

var getJsdocDescription = require('./jsdoc-description');
var getJsDependencies = require('./js-dependencies');

var Period = '.';
var ForwardSlash = '/';
var DotJs = '.js';
var Git = 'git';
var KingJs = 'kingjs';
var PackageName = 'package.json';
var RepositoryUrl = 'https://repository.kingjs.net/';

/**
 * @description Creates or updates fields of `package.json`
 * that can be inferred from the surrounding environment.
 * 
 * @remarks The following are harvested from environment:
 * @remarks - `description`: The first JsDoc `description` found in the `main` js file.
 * @remarks - `name`: A join with period of the relative path of this package in the repository.
 * @remarks - `repository.url`: `https://repository.kingjs.net/` plus a
 * join with forward slash of the relative paths in the repository.
 */
function createPackage() {
  var cwd = process.cwd();

  var targetPath = joinPath(cwd, PackageName);

  // load existing package.json, or template package.json
  var packagePath = targetPath;
  if (!fs.existsSync(packagePath))
    packagePath = require.resolve('./package.t.json');
  var pkg = require(packagePath);
  var { main } = pkg;

  // harvest description from main.js file
  var mainPath = joinPath(cwd, main);  
  if (fs.existsSync(mainPath)) {
    var description = getJsdocDescription(mainPath);
    if (description)
      pkg.description = description;
  }

  // harvest package name from path relative to git enlistment
  var gitDir = getDir();
  var relPath = path.relative(gitDir, cwd);

  // update package name
  var packageName = `@${KingJs}/${relPath[ReplaceAll](path.sep, Period)}`;
  pkg.name = packageName;

  // update package repository
  var repository = `${RepositoryUrl}${relPath[ReplaceAll](path.sep, ForwardSlash)}`;
  if (!pkg.repository)
    pkg.repository = { };
  pkg.repository.type = Git;
  pkg.repository.url = repository;

  // get .js files in package
  var files = npmPacklist.sync();
  var jsFiles = files.filter(o => path.extname(o) == DotJs);
  var dependencies = [...new Set(
    jsFiles.map(o => getJsDependencies(o))
    .reduce((a, o) => { a.push(...o); return a }, [])
  )].sort();

  // add nodeDependencies
  pkg.nodeDependencies = dependencies.filter(o => isBuiltinModule(o));

  fs.writeFileSync(targetPath, JSON.stringify(pkg, null, 2));
}

function joinPath(basePath, relPath) {
  if (path.isAbsolute(relPath))
    return relPath;
  return path.join(basePath, relPath);
}

module.exports = createPackage;